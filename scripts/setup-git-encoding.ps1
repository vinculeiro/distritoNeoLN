# Configurar Git para UTF-8 (evitar problemas con ñ, á, é, etc. en commits)
# Ejecutar: .\scripts\setup-git-encoding.ps1

Write-Host "Configurando Git para UTF-8..."

git config --global core.quotepath false
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8

Write-Host "Listo. Para commits con caracteres especiales, ejecuta antes:"
Write-Host "  [Console]::OutputEncoding = [System.Text.Encoding]::UTF-8"
Write-Host "  chcp 65001"
