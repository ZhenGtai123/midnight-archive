# GitHub Setup

The project is ready to be pushed to GitHub, but the machine still needs authentication.

## Permanent Configuration

Permanent setup has two parts:

1. Git commit identity on this computer.
2. GitHub authentication.

Recommended commands:

```powershell
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL"
git config --global init.defaultBranch main
git config --global --add safe.directory C:/app/adsense-sites-lab
```

`user.name` is the name shown on future commits. `user.email` should be either a verified GitHub email or GitHub's private no-reply email.

## Recommended Authentication

SSH is the best long-term option on this computer. After an SSH key is added to GitHub, normal commands such as `git push` and `git pull` work without repeated browser/token prompts.

You can use the helper script:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\configure-github-ssh.ps1 `
  -GitName "YOUR_NAME" `
  -GitEmail "YOUR_EMAIL"
```

The script:

- sets global Git identity;
- sets `main` as the default branch;
- trusts this project path for Git;
- creates an Ed25519 SSH key if one does not exist;
- starts/uses `ssh-agent` when available;
- prints the public key you need to paste into GitHub.

After the script prints the public key, add it in GitHub:

`GitHub -> Settings -> SSH and GPG keys -> New SSH key`

Then test:

```powershell
ssh -T git@github.com
```

## Push This Project

### Option A: HTTPS

Use this if you prefer not to create an SSH key.

1. Create an empty GitHub repository.
2. Copy the repository HTTPS URL.
3. Add it as the remote:

```powershell
git remote add origin https://github.com/YOUR_NAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

GitHub may ask you to sign in or use a token.

### Option B: SSH

Use this if you want normal developer workflow.

1. Generate an SSH key on this computer.
2. Add the public key to GitHub.
3. Create an empty GitHub repository.
4. Add the SSH remote:

```powershell
git remote add origin git@github.com:YOUR_NAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Before Publishing

- Confirm `site.canonicalOrigin` in `content/midnight-archive.mjs` matches the current preview or production domain.
- Run `node tools/build.mjs`, `node tools/check.mjs`, and `node tools/sync-docs.mjs` before pushing GitHub Pages updates.
- Keep `site.adsense.enabled` as `false` until AdSense approval and a real `ca-pub-...` value exist.
- Review every source URL and rights note before public launch.

## Suggested Repository Name

`midnight-archive` or `adsense-sites-lab`.

## Official Docs

- Git username: https://docs.github.com/en/get-started/git-basics/setting-your-username-in-git
- Commit email: https://docs.github.com/en/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address
- Generate SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
- Add SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account
- Test SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection
