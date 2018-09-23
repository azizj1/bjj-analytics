$OriginalDirectory = Get-Location
Set-Location $PSScriptRoot

Write-Host "Getting modules..."
terraform get

Write-Host "Initializing state backend..."
terraform init

Write-Host "Applying full terraform manipulation"
terraform apply -auto-approve

Set-Location $OriginalDirectory
