param(
  [string]$InstallRoot = "$env:LOCALAPPDATA\Programs\GitHub CLI"
)

$ErrorActionPreference = "Stop"

$headers = @{
  "User-Agent" = "Codex-GitHub-CLI-Installer"
}

Write-Host "Fetching latest GitHub CLI release..."
$release = Invoke-RestMethod -Uri "https://api.github.com/repos/cli/cli/releases/latest" -Headers $headers
$asset = $release.assets |
  Where-Object { $_.name -match "^gh_.*_windows_amd64\.zip$" } |
  Select-Object -First 1

if (-not $asset) {
  throw "Could not find a windows_amd64 zip asset in the latest GitHub CLI release."
}

$tmpDir = Join-Path $env:TEMP ("gh-install-" + [guid]::NewGuid().ToString("N"))
$zipPath = Join-Path $tmpDir $asset.name
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null
New-Item -ItemType Directory -Force -Path $InstallRoot | Out-Null

Write-Host "Downloading $($asset.name)..."
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $zipPath -Headers $headers

Write-Host "Extracting GitHub CLI..."
Expand-Archive -Path $zipPath -DestinationPath $tmpDir -Force
$directGhPath = Join-Path $tmpDir "bin\gh.exe"
$extracted = $null
if (Test-Path $directGhPath) {
  $extracted = Get-Item $tmpDir
} else {
  $extracted = Get-ChildItem -Path $tmpDir -Directory |
    Where-Object { Test-Path (Join-Path $_.FullName "bin\gh.exe") } |
    Select-Object -First 1
}

if (-not $extracted) {
  throw "GitHub CLI archive layout was not recognized."
}

Copy-Item -Path (Join-Path $extracted.FullName "*") -Destination $InstallRoot -Recurse -Force

$binPath = Join-Path $InstallRoot "bin"
$ghPath = Join-Path $binPath "gh.exe"
if (-not (Test-Path $ghPath)) {
  throw "gh.exe was not installed at $ghPath."
}

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$pathParts = @()
if ($userPath) {
  $pathParts = $userPath.Split(";") | Where-Object { $_ -ne "" }
}

$alreadyInPath = $false
foreach ($part in $pathParts) {
  if ($part.TrimEnd("\") -ieq $binPath.TrimEnd("\")) {
    $alreadyInPath = $true
    break
  }
}

if (-not $alreadyInPath) {
  $newPath = (($pathParts + $binPath) -join ";")
  [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
  Write-Host "Added GitHub CLI to the user PATH."
} else {
  Write-Host "GitHub CLI is already in the user PATH."
}

Write-Host ""
& $ghPath --version
Write-Host ""
Write-Host "GitHub CLI installed at $ghPath"
