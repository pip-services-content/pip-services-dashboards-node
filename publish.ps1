#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$rcImage="$($component.registry)/$($component.name):$($component.version)-$($env:TRAVIS_BUILD_NUMBER)-rc"

# Automatically login to server
if ($env:DOCKER_USER -ne $null -and $env:DOCKER_PASS -ne $null) {
    docker login -u $env:DOCKER_USER -p $env:DOCKER_PASS
}

# Push image to docker registry
docker push $rcImage
