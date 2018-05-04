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

# Increase version and publish to npm repository
npm version patch
npm publish

# Update version in component.json
$version = $component.version.Split(".")
$version[2] = [int]$version[2] + 1
$component.version = $version -join "."
$component | ConvertTo-Json | Set-Content -Path "component.json"