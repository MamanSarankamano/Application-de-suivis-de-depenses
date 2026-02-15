/**
 * Appels API avec repli sur les données de démonstration.
 * Utiliser ce script après api.js et demo-data.js sur les pages qui doivent rester vivantes sans backend.
 */

async function apiRequestWithDemo(endpoint, options = {}, data = null) {
    const method = typeof options === 'string' ? options : (options.method || 'GET');
    const useDemo = window.DEMO_DATA && window.DEMO_DATA.useDemoData();

    // Si mode démo activé, utiliser directement les données de démo
    if (useDemo) {
        // Gérer les opérations POST/PUT/DELETE en mode démo avec localStorage
        if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
            return handleDemoMutation(endpoint, method, data);
        }
        // Pour GET, utiliser getDemoResponse
        const demo = await getDemoResponse(endpoint, method, data);
        if (demo !== undefined) return demo;
    }

    // Essayer l'API réelle
    try {
        const result = await apiRequest(endpoint, options, data);
        
        // Marquer que l'API est disponible
        try {
            localStorage.setItem('suivi_api_available', '1');
        } catch (e) {}
        
        // Si l'API retourne des données vides, activer le mode démo automatiquement
        if (isDataEmpty(result) && !useDemo) {
            const demo = await getDemoResponse(endpoint, method, data);
            if (demo !== undefined && window.DEMO_DATA && window.DEMO_DATA.setDemoMode) {
                try { window.DEMO_DATA.setDemoMode(true); } catch (e) {}
                return demo;
            }
        }
        
        return result;
    } catch (err) {
        // En cas d'erreur, marquer l'API comme indisponible
        try {
            localStorage.setItem('suivi_api_available', '0');
        } catch (e) {}
        // En cas d'erreur API, utiliser les données de démo
        const demo = await getDemoResponse(endpoint, method, data);
        if (demo !== undefined) {
            if (window.DEMO_DATA && window.DEMO_DATA.setDemoMode) {
                try { window.DEMO_DATA.setDemoMode(true); } catch (e) {}
            }
            return demo;
        }
        throw err;
    }
}

function isDataEmpty(result) {
    if (!result) return true;
    if (Array.isArray(result)) return result.length === 0;
    if (result.data && Array.isArray(result.data)) return result.data.length === 0;
    if (result.total_income === 0 && result.total_expense === 0 && result.balance === 0) return true;
    return false;
}

function handleDemoMutation(endpoint, method, data) {
    if (!window.DEMO_DATA) return Promise.resolve({ success: true });
    
    const base = endpoint.split('?')[0];
    
    if (base === '/api/transactions' || base.startsWith('/api/transactions/')) {
        if (method === 'POST') {
            return window.DEMO_DATA.createDemoTransaction(data);
        } else if (method === 'PUT') {
            const id = parseInt(endpoint.split('/').pop());
            return window.DEMO_DATA.updateDemoTransaction(id, data);
        } else if (method === 'DELETE') {
            const id = parseInt(endpoint.split('/').pop());
            return window.DEMO_DATA.deleteDemoTransaction(id);
        }
    } else if (base === '/api/categories' || base.startsWith('/api/categories/')) {
        if (method === 'POST') {
            return window.DEMO_DATA.createDemoCategory(data);
        } else if (method === 'PUT') {
            const id = parseInt(endpoint.split('/').pop());
            return window.DEMO_DATA.updateDemoCategory(id, data);
        } else if (method === 'DELETE') {
            const id = parseInt(endpoint.split('/').pop());
            return window.DEMO_DATA.deleteDemoCategory(id);
        }
    }
    
    return Promise.resolve({ success: true, message: 'Opération effectuée en mode démo' });
}

function parseQuery(url) {
    const q = (url || '').split('?')[1] || '';
    const out = {};
    q.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k && v) out[k] = decodeURIComponent(v);
    });
    return out;
}

async function getDemoResponse(endpoint, method, _data) {
    if (!window.DEMO_DATA) return undefined;

    const base = endpoint.split('?')[0];
    const query = parseQuery(endpoint);

    if (base === '/api/transactions/stats/summary') return window.DEMO_DATA.getDemoSummary();
    if (base === '/api/transactions/stats/monthly') return window.DEMO_DATA.getDemoMonthly();
    if (base === '/api/transactions/stats/by-category') return window.DEMO_DATA.getDemoByCategory();
    if (base === '/api/categories') return window.DEMO_DATA.getDemoCategories();

    // Récupérer une transaction individuelle
    if (base.startsWith('/api/transactions/') && method === 'GET') {
        const id = parseInt(base.split('/').pop());
        const allTx = window.DEMO_DATA.getAllDemoTransactions();
        const tx = allTx.find(t => t.id === id);
        if (tx) return Promise.resolve(tx);
        return Promise.reject(new Error('Transaction non trouvée'));
    }

    if (base === '/api/transactions') {
        const page = parseInt(query.page, 10) || 1;
        return window.DEMO_DATA.getDemoTransactions(
            page,
            query.search,
            query.category_id,
            query.type
        );
    }

    return undefined;
}

window.apiRequestWithDemo = apiRequestWithDemo;
