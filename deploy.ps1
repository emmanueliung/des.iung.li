Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Deploiement de des.iung.li vers le VPS Infomaniak" -ForegroundColor Cyan
Write-Host "  Serveur: ubuntu@84.234.19.22" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Git Push
Write-Host "[1/3] Verification et envoi vers GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ATTENTION] Le push git a rencontre un avertissement." -ForegroundColor Yellow
} else {
    Write-Host "[OK] Code synchronise sur GitHub." -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/3] Connexion au VPS et mise a jour..." -ForegroundColor Yellow
Write-Host "Veuillez entrer votre mot de passe SSH si demande." -ForegroundColor Cyan
Write-Host ""

$remoteScript = @'
set -e
TARGET_DIR="/var/www/des.iung.li"

# S'assurer que le dossier existe
if [ ! -d "$TARGET_DIR" ]; then
    echo "[+] Dossier non trouve, initialisation dans $TARGET_DIR..."
    sudo mkdir -p /var/www
    sudo git clone https://github.com/emmanueliung/des.iung.li.git "$TARGET_DIR"
    sudo chown -R ubuntu:ubuntu "$TARGET_DIR"
fi

cd "$TARGET_DIR"
echo "[+] Mise a jour du code (git pull)..."
git pull origin main

echo "[+] Installation des dependances (npm install)..."
npm install --production=false

echo "[+] Compilation de production Next.js (npm run build)..."
npm run build

echo "[+] Gestion du processus PM2..."
if pm2 list | grep -q "des.iung.li"; then
    echo "[+] Redemarrage de l'application..."
    pm2 reload des.iung.li || pm2 restart des.iung.li
else
    echo "[+] Demarrage initial du processus PM2..."
    pm2 start npm --name "des.iung.li" -- start
    pm2 save
fi

echo ""
echo "[OK] Application des.iung.li a jour et active sur le VPS !"
pm2 status
'@

ssh -t ubuntu@84.234.19.22 "bash -s" << @"
$remoteScript
"@

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCES] Deploiement termine avec succes sur le VPS !" -ForegroundColor Green
} else {
    Write-Host "`n[NOTE] Si la session s'est interrompue, vous pouvez vous connecter manuellement avec:" -ForegroundColor Yellow
    Write-Host "ssh ubuntu@84.234.19.22" -ForegroundColor White
}
