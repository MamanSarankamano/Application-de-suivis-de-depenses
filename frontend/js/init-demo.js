/**
 * Initialisation du mode démo - Active automatiquement les données de simulation
 * au premier chargement ou si l'API n'est pas disponible.
 */

(function initDemoMode() {
    // Attendre que DEMO_DATA soit disponible
    if (typeof window.DEMO_DATA === 'undefined') {
        setTimeout(initDemoMode, 100);
        return;
    }

    // Vérifier si c'est la première visite
    try {
        const hasVisited = localStorage.getItem('suivi_has_visited');
        const apiAvailable = localStorage.getItem('suivi_api_available');
        
        // Si première visite ou API jamais disponible, activer le mode démo
        if (!hasVisited || apiAvailable === '0' || apiAvailable === null) {
            window.DEMO_DATA.setDemoMode(true);
            localStorage.setItem('suivi_has_visited', '1');
        }
    } catch (e) {
        // En cas d'erreur localStorage, activer quand même le mode démo
        try {
            window.DEMO_DATA.setDemoMode(true);
        } catch (e2) {}
    }

    // Tester la disponibilité de l'API en arrière-plan
    if (typeof apiRequest !== 'undefined') {
        setTimeout(async () => {
            try {
                // Essayer un appel API simple (stats summary)
                await apiRequest('/api/transactions/stats/summary');
                localStorage.setItem('suivi_api_available', '1');
            } catch (e) {
                // API non disponible, activer le mode démo
                localStorage.setItem('suivi_api_available', '0');
                if (window.DEMO_DATA && window.DEMO_DATA.setDemoMode) {
                    window.DEMO_DATA.setDemoMode(true);
                }
            }
        }, 500);
    }
})();
