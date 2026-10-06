Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Deploiement de des.iung.li vers le VPS Infomaniak" -ForegroundColor Cyan
Write-Host "  Serveur: ubuntu@84.234.19.22" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verification et envoi vers GitHub
Write-Host "[1/3] Envoi des modifications vers GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ATTENTION] Le push git a rencontre un avertissement." -ForegroundColor Yellow
} else {
    Write-Host "[OK] Code synchronise sur GitHub." -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/3] Mise a jour du serveur VPS..." -ForegroundColor Yellow

$remoteCommand = "cd /var/www/des.iung.li && git pull origin main && npm install --production=false && npm run build && (pm2 reload des.iung.li || pm2 restart des.iung.li || pm2 start npm --name des.iung.li -- start -- -p 3010) && pm2 save && pm2 status"

ssh ubuntu@84.234.19.22 $remoteCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCES] Le site des.iung.li est a jour et en ligne sur le VPS !" -ForegroundColor Green
} else {
    Write-Host "`n[ERREUR] Une erreur est survenue lors de l'execution distante." -ForegroundColor Red
}
