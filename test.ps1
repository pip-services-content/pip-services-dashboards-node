#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

$component = Get-Content -Path "component.json" | ConvertFrom-Json
$testImage="$($component.registry)/$($component.name):$($component.version)-test"

# Set environment variables
$env:IMAGE = $testImage

try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.test.yml down

    docker-compose -f ./docker/docker-compose.test.yml up --build --abort-on-container-exit --exit-code-from test
} finally {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.test.yml down
}
