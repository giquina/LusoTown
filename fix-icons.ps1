# Mass replace UserGroupIcon with UsersIcon across all app files

Write-Host "Starting mass replacement of UserGroupIcon with UsersIcon..." -ForegroundColor Green

$rootPath = "C:\Users\Student\AppData\Local\AnthropicClaude\app-0.12.55\LusoTown\web-app\src\app"
$files = Get-ChildItem -Path $rootPath -Recurse -Filter "*.tsx" -File

$totalFiles = 0
$processedFiles = 0

foreach ($file in $files) {
    $totalFiles++
    $content = Get-Content $file.FullName -Raw
    
    if ($content -match "UserGroupIcon") {
        Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
        
        # Replace UserGroupIcon with UsersIcon
        $content = $content -replace "UserGroupIcon", "UsersIcon"
        
        # Write back to file
        $content | Set-Content $file.FullName -NoNewline
        $processedFiles++
        Write-Host "Fixed: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Replacement complete!" -ForegroundColor Green
Write-Host "Total files scanned: $totalFiles" -ForegroundColor Cyan
Write-Host "Files processed: $processedFiles" -ForegroundColor Cyan
