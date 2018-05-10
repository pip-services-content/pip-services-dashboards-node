#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$tag="v$($component.version)-$($component.build)"

# Configure git
git config --global user.email "pipdevs@gmail.com" 
git config --global user.name "pipdeveloper" 

git remote rm origin 
git remote add origin "https://pipdeveloper:$($env:GITHUB_API_KEY)@github.com/pip-services-content/$($component.name).git"

git add ./obj/*
git add ./component.json
git commit -m "project build by Travis CI [skip ci]"

# Set git tag
git tag $tag -a -m "Generated tag from GitLabCI for build #$($component.build)"
git push --tags origin HEAD:master 