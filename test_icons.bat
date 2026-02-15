@echo off
echo ========================================
echo  TEST DE L'IMPLEMENTATION DES ICONES
echo ========================================
echo.

echo [1/5] Verification de la structure des fichiers...
if exist "frontend\js\icons.js" (
    echo   [OK] icons.js existe
) else (
    echo   [ERREUR] icons.js manquant
    exit /b 1
)

if exist "frontend\css\icons.css" (
    echo   [OK] icons.css existe
) else (
    echo   [ERREUR] icons.css manquant
    exit /b 1
)

if exist "frontend\icons-demo.html" (
    echo   [OK] icons-demo.html existe
) else (
    echo   [ERREUR] icons-demo.html manquant
    exit /b 1
)

echo.
echo [2/5] Verification du contenu JavaScript...
findstr /C:"CATEGORY_CONFIG" "frontend\js\icons.js" >nul
if %errorlevel% equ 0 (
    echo   [OK] CATEGORY_CONFIG defini
) else (
    echo   [ERREUR] CATEGORY_CONFIG manquant
    exit /b 1
)

findstr /C:"ACTION_ICONS" "frontend\js\icons.js" >nul
if %errorlevel% equ 0 (
    echo   [OK] ACTION_ICONS defini
) else (
    echo   [ERREUR] ACTION_ICONS manquant
    exit /b 1
)

echo.
echo [3/5] Verification des couleurs dans le code...
findstr /C:"#16A34A" "frontend\js\icons.js" >nul
if %errorlevel% equ 0 (
    echo   [OK] Couleur verte (#16A34A) presente
) else (
    echo   [ERREUR] Couleur verte manquante
)

findstr /C:"#3B82F6" "frontend\js\icons.js" >nul
if %errorlevel% equ 0 (
    echo   [OK] Couleur bleue (#3B82F6) presente
) else (
    echo   [ERREUR] Couleur bleue manquante
)

findstr /C:"#F59E0B" "frontend\js\icons.js" >nul
if %errorlevel% equ 0 (
    echo   [OK] Couleur orange (#F59E0B) presente
) else (
    echo   [ERREUR] Couleur orange manquante
)

echo.
echo [4/5] Tests backend...
python -m pytest backend/tests.py -v --tb=short
if %errorlevel% equ 0 (
    echo   [OK] Tous les tests backend passent
) else (
    echo   [ERREUR] Certains tests backend echouent
    exit /b 1
)

echo.
echo [5/5] Ouverture de la page de demonstration...
echo   Ouverture de icons-demo.html dans le navigateur par defaut...
start "" "frontend\icons-demo.html"

echo.
echo ========================================
echo  TESTS TERMINES AVEC SUCCES!
echo ========================================
echo.
echo Prochaines etapes:
echo 1. Verifier que la page de demo s'affiche correctement
echo 2. Verifier que toutes les icones sont visibles
echo 3. Verifier les couleurs de chaque categorie
echo 4. Tester les animations au survol
echo.
echo Documentation:
echo - Guide complet: .gemini\antigravity\brain\...\images_guide.md
echo - Plan d'implementation: .gemini\antigravity\brain\...\implementation_plan.md
echo - Reference rapide: .gemini\antigravity\brain\...\icons_reference.md
echo - Walkthrough: .gemini\antigravity\brain\...\walkthrough.md
echo.
pause
