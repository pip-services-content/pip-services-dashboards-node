#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$stageImage="$($component.registry)/$($component.name):$($component.version)-$($env:TRAVIS_BUILD_NUMBER)-rc"

# Build docker image
docker build -f docker/Dockerfile -t $stageImage .

# Set environment variables
$env:IMAGE = $stageImage

try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down

    docker-compose -f ./docker/docker-compose.yml up -d

    # Test using curl
    ##curl http://localhost:8080/ -X POST -v
} finally {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down
}
