#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

$component = Get-Content -Path "component.json" | ConvertFrom-Json

# Login to npm
if ($env:NPM_USER -ne "") {
    npm login   
} else {
    npm install -g npm-cli-login
    npm-cli-login
}

npm version patch

# Update version in component.json
$version = $component.version.Split(".")
$version[2] = [int]$version[2] + 1
$component.version = $version -join "."
$component | ConvertTo-Json | Set-Content -Path "component.json"

npm publish