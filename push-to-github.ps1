# PowerShell script to push to GitHub
# Run this after creating your GitHub repository

Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Green

# Replace YOUR_USERNAME with your actual GitHub username
$username = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter your repository name (default: GameLaunchAlarm)" 

if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "GameLaunchAlarm"
}

Write-Host "`n📝 Adding remote origin..." -ForegroundColor Yellow
git remote add origin "https://github.com/$username/$repoName.git"

Write-Host "🔄 Renaming branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "`n✅ Done! Your code is now on GitHub!" -ForegroundColor Green
Write-Host "🌐 Next step: Go to https://vercel.com and import your repository" -ForegroundColor Cyan

