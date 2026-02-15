/**
 * Données de démonstration - Suivi Dépenses
 * Rend le site vivant avec des données simulées réalistes quand l'API est indisponible ou vide.
 */

const DEMO_CATEGORIES = [
    { id: 1, name: 'Alimentation', color: '#10B981' },
    { id: 2, name: 'Transport', color: '#06B6D4' },
    { id: 3, name: 'Logement', color: '#8B5CF6' },
    { id: 4, name: 'Santé', color: '#F43F5E' },
    { id: 5, name: 'Loisirs', color: '#F59E0B' },
    { id: 6, name: 'Shopping', color: '#EC4899' },
    { id: 7, name: 'Épargne', color: '#14B8A6' },
    { id: 8, name: 'Salaire', color: '#22C55E' },
    { id: 9, name: 'Freelance', color: '#3B82F6' },
    { id: 10, name: 'Investissements', color: '#6366F1' }
];

function getLastMonths(n) {
    const months = [];
    const names = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        months.push(names[d.getMonth()] + ' ' + d.getFullYear());
    }
    return months;
}

function randomDate(daysAgo) {
    const d = new Date();
    d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
    return d.toISOString().split('T')[0];
}

const DEMO_TRANSACTIONS = (function () {
    const descriptions = {
        revenu: ['Salaire mensuel', 'Virement freelance', 'Dividendes', 'Remboursement', 'Prime annuelle', 'Revenus passifs', 'Consulting', 'Projet bonus'],
        depense: ['Courses Carrefour', 'Essence Total', 'Loyer', 'EDF', 'Netflix', 'Restaurant', 'Pharmacie', 'Sport', 'Cadeau', 'Abonnement mobile', 'Assurance auto', 'Coiffeur', 'Livres', 'Cinéma']
    };
    const list = [];
    let id = 1;
    for (let i = 0; i < 45; i++) {
        const isRevenu = i % 5 === 0 || (i > 20 && i % 4 === 0);
        const type = isRevenu ? 'revenu' : 'depense';
        const catPool = isRevenu ? [8, 9, 10] : [1, 2, 3, 4, 5, 6];
        const catId = catPool[Math.floor(Math.random() * catPool.length)];
        const cat = DEMO_CATEGORIES.find(c => c.id === catId) || DEMO_CATEGORIES[0];
        const amount = isRevenu
            ? (Math.random() * 8000000 + 1500000).toFixed(0)
            : (Math.random() * 500000 + 15000).toFixed(0);
        const descs = type === 'revenu' ? descriptions.revenu : descriptions.depense;
        list.push({
            id: id++,
            date: randomDate(120),
            description: descs[Math.floor(Math.random() * descs.length)],
            type: type,
            amount: parseFloat(amount),
            category_id: catId,
            category: cat.name,
            category_name: cat.name,
            category_color: cat.color
        });
    }
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
    return list;
})();

const DEMO_STATS_SUMMARY = (function () {
    const incomes = DEMO_TRANSACTIONS.filter(t => t.type === 'revenu').reduce((s, t) => s + t.amount, 0);
    const expenses = DEMO_TRANSACTIONS.filter(t => t.type === 'depense').reduce((s, t) => s + t.amount, 0);
    return {
        balance: Math.round((incomes - expenses) * 100) / 100,
        total_income: Math.round(incomes * 100) / 100,
        total_expense: Math.round(expenses * 100) / 100
    };
})();

const DEMO_STATS_MONTHLY = (function () {
    const months = getLastMonths(6);
    const names = months.map(m => m.split(' ')[0]);
    return months.map((month, i) => {
        const rev = DEMO_TRANSACTIONS.filter(t => t.type === 'revenu').reduce((s, t) => s + t.amount, 0);
        const exp = DEMO_TRANSACTIONS.filter(t => t.type === 'depense').reduce((s, t) => s + t.amount, 0);
        const n = DEMO_TRANSACTIONS.length;
        const baseIncome = n ? rev / 6 + (Math.random() * 400000 - 100000) : 6400000;
        const baseExpense = n ? exp / 6 + (Math.random() * 200000 - 60000) : 3600000;
        return {
            month,
            income: Math.round(Math.max(0, baseIncome) * 100) / 100,
            expense: Math.round(Math.max(0, baseExpense) * 100) / 100
        };
    });
})();

const DEMO_STATS_BY_CATEGORY = (function () {
    const byCat = {};
    DEMO_TRANSACTIONS.filter(t => t.type === 'depense').forEach(t => {
        byCat[t.category] = (byCat[t.category] || 0) + t.amount;
    });
    return Object.entries(byCat).map(([name, value]) => {
        const cat = DEMO_CATEGORIES.find(c => c.name === name);
        return { name, value: Math.round(value * 100) / 100, color: cat ? cat.color : '#64748B' };
    }).sort((a, b) => b.value - a.value);
})();

const PER_PAGE = 10;

function getDemoSummary() {
    return Promise.resolve({ ...DEMO_STATS_SUMMARY });
}

function getDemoMonthly() {
    return Promise.resolve([...DEMO_STATS_MONTHLY]);
}

function getDemoByCategory() {
    return Promise.resolve([...DEMO_STATS_BY_CATEGORY]);
}

function getDemoTransactions(page = 1, _search, _categoryId, _type) {
    const start = (page - 1) * PER_PAGE;
    const data = DEMO_TRANSACTIONS.slice(start, start + PER_PAGE);
    const pages = Math.ceil(DEMO_TRANSACTIONS.length / PER_PAGE) || 1;
    return Promise.resolve({ data, pages, current_page: page });
}

function getDemoCategories() {
    return Promise.resolve([...DEMO_CATEGORIES]);
}

/** Détecte si on doit utiliser la démo (API en erreur ou mode démo forcé). */
function useDemoData() {
    try {
        if (typeof localStorage !== 'undefined') {
            // Vérifier si le mode démo est explicitement activé
            if (localStorage.getItem('suivi_demo_mode') === '1') return true;

            // Activer automatiquement si c'est la première visite ou si l'API n'est pas accessible
            const hasTriedApi = localStorage.getItem('suivi_api_available') === '1';
            if (!hasTriedApi) {
                // Premier chargement : activer le mode démo par défaut
                localStorage.setItem('suivi_demo_mode', '1');
                return true;
            }
        }
    } catch (e) { }
    return false;
}

/** Active ou désactive le mode démo (à appeler depuis la bannière). */
function setDemoMode(enabled) {
    try {
        if (enabled) localStorage.setItem('suivi_demo_mode', '1');
        else localStorage.removeItem('suivi_demo_mode');
        return true;
    } catch (e) { return false; }
}

// Stockage local pour les transactions et catégories créées en mode démo
function getLocalStorageTransactions() {
    try {
        const stored = localStorage.getItem('suivi_demo_transactions');
        return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
}

function saveLocalStorageTransactions(transactions) {
    try {
        localStorage.setItem('suivi_demo_transactions', JSON.stringify(transactions));
        // Déclencher un événement personnalisé pour notifier les autres pages
        window.dispatchEvent(new CustomEvent('suivi-data-updated', { detail: { type: 'transactions' } }));
        return true;
    } catch (e) { return false; }
}

function getLocalStorageCategories() {
    try {
        const stored = localStorage.getItem('suivi_demo_categories');
        return stored ? JSON.parse(stored) : [];
    } catch (e) { return []; }
}

function saveLocalStorageCategories(categories) {
    try {
        localStorage.setItem('suivi_demo_categories', JSON.stringify(categories));
        // Déclencher un événement personnalisé pour notifier les autres pages
        window.dispatchEvent(new CustomEvent('suivi-data-updated', { detail: { type: 'categories' } }));
        return true;
    } catch (e) { return false; }
}

function getAllDemoTransactions() {
    const local = getLocalStorageTransactions();
    const base = DEMO_TRANSACTIONS.map(t => ({ ...t }));
    // Fusionner les transactions locales avec les démo (les locales ont priorité)
    const merged = [...base];
    local.forEach(lt => {
        const idx = merged.findIndex(t => t.id === lt.id);
        if (idx >= 0) merged[idx] = lt;
        else merged.push(lt);
    });
    merged.sort((a, b) => new Date(b.date) - new Date(a.date));
    return merged;
}

function getAllDemoCategories() {
    const local = getLocalStorageCategories();
    const base = DEMO_CATEGORIES.map(c => ({ ...c }));
    local.forEach(lc => {
        const idx = base.findIndex(c => c.id === lc.id);
        if (idx >= 0) base[idx] = lc;
        else base.push(lc);
    });
    return base;
}

function createDemoTransaction(data) {
    const local = getLocalStorageTransactions();
    const maxId = Math.max(...DEMO_TRANSACTIONS.map(t => t.id), ...local.map(t => t.id || 0), 0);
    const cat = getAllDemoCategories().find(c => c.id === data.category_id) || DEMO_CATEGORIES[0];
    // Normaliser le type: 'revenue'/'revenu' -> 'revenu', 'expense'/'depense' -> 'depense'
    let txType = data.type;
    if (txType === 'revenue' || txType === 'revenu') txType = 'revenu';
    else if (txType === 'expense' || txType === 'depense') txType = 'depense';

    const newTx = {
        id: maxId + 1,
        date: data.date || new Date().toISOString().split('T')[0],
        description: data.description || 'Nouvelle transaction',
        type: txType,
        amount: parseFloat(data.amount) || 0,
        category_id: data.category_id,
        category: cat.name,
        category_name: cat.name,
        category_color: cat.color
    };
    local.push(newTx);
    saveLocalStorageTransactions(local);
    return Promise.resolve(newTx);
}

function updateDemoTransaction(id, data) {
    const local = getLocalStorageTransactions();
    const idx = local.findIndex(t => t.id === id);
    if (idx >= 0) {
        const cat = getAllDemoCategories().find(c => c.id === data.category_id) || DEMO_CATEGORIES[0];
        // Normaliser le type
        let txType = data.type;
        if (txType === 'revenue' || txType === 'revenu') txType = 'revenu';
        else if (txType === 'expense' || txType === 'depense') txType = 'depense';

        local[idx] = {
            ...local[idx],
            ...data,
            type: txType,
            category: cat.name,
            category_name: cat.name,
            category_color: cat.color
        };
        saveLocalStorageTransactions(local);
        return Promise.resolve(local[idx]);
    }
    return Promise.reject(new Error('Transaction non trouvée'));
}

function deleteDemoTransaction(id) {
    const local = getLocalStorageTransactions();
    const filtered = local.filter(t => t.id !== id);
    saveLocalStorageTransactions(filtered);
    return Promise.resolve({ success: true });
}

function createDemoCategory(data) {
    const local = getLocalStorageCategories();
    const maxId = Math.max(...DEMO_CATEGORIES.map(c => c.id), ...local.map(c => c.id || 0), 0);
    const newCat = {
        id: maxId + 1,
        name: data.name || 'Nouvelle catégorie',
        color: data.color || '#64748B'
    };
    local.push(newCat);
    saveLocalStorageCategories(local);
    return Promise.resolve(newCat);
}

function updateDemoCategory(id, data) {
    const local = getLocalStorageCategories();
    const idx = local.findIndex(c => c.id === id);
    if (idx >= 0) {
        local[idx] = { ...local[idx], ...data };
        saveLocalStorageCategories(local);
        return Promise.resolve(local[idx]);
    }
    return Promise.reject(new Error('Catégorie non trouvée'));
}

function deleteDemoCategory(id) {
    const local = getLocalStorageCategories();
    const filtered = local.filter(c => c.id !== id);
    saveLocalStorageCategories(filtered);
    return Promise.resolve({ success: true });
}

function getDemoSummary() {
    const allTx = getAllDemoTransactions();
    const incomes = allTx.filter(t => t.type === 'revenu').reduce((s, t) => s + t.amount, 0);
    const expenses = allTx.filter(t => t.type === 'depense').reduce((s, t) => s + t.amount, 0);
    return Promise.resolve({
        balance: Math.round((incomes - expenses) * 100) / 100,
        total_income: Math.round(incomes * 100) / 100,
        total_expense: Math.round(expenses * 100) / 100
    });
}

function getDemoMonthly() {
    const allTx = getAllDemoTransactions();
    const months = getLastMonths(6);
    return Promise.resolve(months.map(month => {
        const monthName = month.split(' ')[0];
        const monthYear = month.split(' ')[1];
        const monthTx = allTx.filter(t => {
            const txDate = new Date(t.date);
            const txMonth = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'][txDate.getMonth()];
            return txMonth === monthName && txDate.getFullYear().toString() === monthYear;
        });
        const income = monthTx.filter(t => t.type === 'revenu').reduce((s, t) => s + t.amount, 0);
        const expense = monthTx.filter(t => t.type === 'depense').reduce((s, t) => s + t.amount, 0);
        return {
            month,
            income: Math.round(income * 100) / 100,
            expense: Math.round(expense * 100) / 100
        };
    }));
}

function getDemoByCategory() {
    const allTx = getAllDemoTransactions();
    const byCat = {};
    allTx.filter(t => t.type === 'depense').forEach(t => {
        byCat[t.category] = (byCat[t.category] || 0) + t.amount;
    });
    return Promise.resolve(Object.entries(byCat).map(([name, value]) => {
        const cat = getAllDemoCategories().find(c => c.name === name);
        return { name, value: Math.round(value * 100) / 100, color: cat ? cat.color : '#64748B' };
    }).sort((a, b) => b.value - a.value));
}

function getDemoTransactions(page = 1, search, categoryId, type) {
    let allTx = getAllDemoTransactions();

    // Filtrer par recherche
    if (search) {
        const searchLower = search.toLowerCase();
        allTx = allTx.filter(t => t.description.toLowerCase().includes(searchLower));
    }

    // Filtrer par catégorie
    if (categoryId) {
        allTx = allTx.filter(t => t.category_id === parseInt(categoryId));
    }

    // Filtrer par type (normaliser les types)
    if (type) {
        const typeMap = {
            'revenue': 'revenu',
            'revenu': 'revenu',
            'expense': 'depense',
            'depense': 'depense',
            'income': 'revenu',
            'outcome': 'depense'
        };
        const normalizedType = typeMap[type] || type;
        allTx = allTx.filter(t => t.type === normalizedType || t.type === type);
    }

    const start = (page - 1) * PER_PAGE;
    const data = allTx.slice(start, start + PER_PAGE);
    const pages = Math.ceil(allTx.length / PER_PAGE) || 1;
    return Promise.resolve({ data, pages, current_page: page });
}

function getDemoCategories() {
    return Promise.resolve([...getAllDemoCategories()]);
}

window.DEMO_DATA = {
    categories: DEMO_CATEGORIES,
    transactions: DEMO_TRANSACTIONS,
    summary: DEMO_STATS_SUMMARY,
    monthly: DEMO_STATS_MONTHLY,
    byCategory: DEMO_STATS_BY_CATEGORY,
    getDemoSummary,
    getDemoMonthly,
    getDemoByCategory,
    getDemoTransactions,
    getDemoCategories,
    useDemoData,
    setDemoMode,
    createDemoTransaction,
    updateDemoTransaction,
    deleteDemoTransaction,
    createDemoCategory,
    updateDemoCategory,
    deleteDemoCategory,
    getAllDemoTransactions,
    getAllDemoCategories
};
