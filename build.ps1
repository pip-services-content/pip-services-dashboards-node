#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

$component = Get-Content -Path "component.json" | ConvertFrom-Json
$buildImage="$($component.registry)/$($component.name):$($component.version)-build"
$container=$component.name

# Remove build files
if (Test-Path "obj") {
    Remove-Item -Recurse -Force -Path "obj"
}

# Build docker image
docker build -f docker/Dockerfile.build -t $buildImage .

# Create and copy compiled files, then destroy
docker create --name $container $buildImage
docker cp "$($container):/app/obj" ./obj
docker rm $container