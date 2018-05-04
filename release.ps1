#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data
$component = Get-Content -Path "component.json" | ConvertFrom-Json

# Login to npm
if (-not (Test-Path env:NPM_USER)) {
    npm login   
} else {
    npm install -g npm-cli-login
    npm-cli-login
}

# Configure git
git config --global user.email "pipdevs@gmail.com" 
git config --global user.name "pipdeveloper" 

git remote rm origin 
git remote add origin "https://pipdeveloper:$($env:GITHUB_API_KEY)@github.com/pip-services-content/$($component.name).git"

git add ./obj/*
git commit -m "project build by Travis CI [skip ci]"
git push

# Publish to npm repository
npm publish