param(
  [Parameter(Mandatory = $true)]
  [string]$GitName,

  [Parameter(Mandatory = $true)]
  [string]$GitEmail,

  [string]$KeyPath = "$env:USERPROFILE\.ssh\id_ed25519_github",

  [switch]$SkipSshKey
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$bundledGit = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe"
$git = if (Test-Path $bundledGit) { $bundledGit } else { "git" }

Write-Host "Configuring Git identity..."
& $git config --global user.name $GitName
& $git config --global user.email $GitEmail
& $git config --global init.defaultBranch main
& $git config --global --add safe.directory $projectRoot.Replace("\", "/")

if (-not $SkipSshKey) {
  $sshDir = Split-Path -Parent $KeyPath
  New-Item -ItemType Directory -Force -Path $sshDir | Out-Null

  if (-not (Test-Path $KeyPath)) {
    Write-Host "Generating SSH key at $KeyPath..."
    ssh-keygen -q -t ed25519 -C $GitEmail -f $KeyPath -N '""'
    if ($LASTEXITCODE -ne 0) {
      throw "ssh-keygen failed with exit code $LASTEXITCODE."
    }
  } else {
    Write-Host "SSH key already exists at $KeyPath"
  }

  try {
    $agent = Get-Service ssh-agent -ErrorAction Stop
    if ($agent.Status -ne "Running") {
      Start-Service ssh-agent
    }
    ssh-add $KeyPath
  } catch {
    Write-Warning "Could not start ssh-agent automatically. You can still add this key manually later."
  }

  $sshConfigPath = Join-Path $sshDir "config"
  $normalizedKeyPath = $KeyPath.Replace("\", "/")
  $githubHostBlock = @"

Host github.com
  HostName github.com
  User git
  IdentityFile $normalizedKeyPath
  IdentitiesOnly yes
"@

  if (Test-Path $sshConfigPath) {
    $sshConfig = Get-Content -Raw $sshConfigPath
    if ($sshConfig -notmatch "(?m)^Host\s+github\.com\s*$") {
      Add-Content -Path $sshConfigPath -Value $githubHostBlock
      Write-Host "Added github.com identity to $sshConfigPath"
    } else {
      Write-Host "SSH config already has a github.com host block; left it unchanged."
    }
  } else {
    Set-Content -Path $sshConfigPath -Value $githubHostBlock.TrimStart()
    Write-Host "Created $sshConfigPath"
  }

  $pubKeyPath = "$KeyPath.pub"
  Write-Host ""
  Write-Host "Copy this public key into GitHub -> Settings -> SSH and GPG keys -> New SSH key:"
  Write-Host ""
  Get-Content $pubKeyPath
  Write-Host ""
  Write-Host "After adding it to GitHub, test with:"
  Write-Host "ssh -T git@github.com"
}

Write-Host ""
Write-Host "Git permanent configuration is ready."
