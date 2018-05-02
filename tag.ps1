#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

$component = Get-Content -Path "component.json" | ConvertFrom-Json
$tag="v$($component.version)-$($component.build)-rc"

# Configure git
git config --global user.email "pipdevs@gmail.com" 
git config --global user.name "pipdeveloper" 

git remote rm origin 
git remote add origin "https://pipdeveloper:$($env:GITHUB_API_KEY)@github.com/pip-services-content/$($component.name).git"

# Set git tag
git tag $tag -a -m "Generated tag from GitLabCI for build #$($component.build)"
git push --tags