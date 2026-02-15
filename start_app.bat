@echo off
REM ========================================
REM  Script de démarrage - Suivi Dépenses
REM ========================================

echo.
echo ========================================
echo   SUIVI DEPENSES - Demarrage
echo ========================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Python n'est pas installe ou pas dans le PATH
    echo Veuillez installer Python depuis https://www.python.org/
    pause
    exit /b 1
)

echo [OK] Python est installe
echo.

REM Vérifier si les dépendances sont installées
echo Verification des dependances...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo [INFO] Installation des dependances backend...
    pip install -r backend\requirements.txt
    if errorlevel 1 (
        echo [ERREUR] Echec de l'installation des dependances
        pause
        exit /b 1
    )
)

echo [OK] Dependances installees
echo.

REM Initialiser la base de données si elle n'existe pas
if not exist "backend\instance\expense_tracker.db" (
    echo [INFO] Initialisation de la base de donnees...
    python backend\setup_db.py
    if errorlevel 1 (
        echo [ERREUR] Echec de l'initialisation de la base de donnees
        pause
        exit /b 1
    )
    echo [OK] Base de donnees initialisee
    echo.
)

REM Démarrer le serveur backend
echo ========================================
echo   Demarrage du serveur backend...
echo ========================================
echo.
echo Le serveur sera accessible sur:
echo   http://localhost:5000
echo.
echo Pour acceder a l'application:
echo   1. Ouvrez votre navigateur
echo   2. Allez sur: file:///%CD%\frontend\index.html
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
echo ========================================
echo.

cd backend
python run.py

REM Si le serveur s'arrête
echo.
echo ========================================
echo   Serveur arrete
echo ========================================
pause
