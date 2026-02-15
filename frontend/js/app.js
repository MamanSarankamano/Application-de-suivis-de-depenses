const app = {
    categoryChart: null,

    init: () => {
        auth.init();
        app.setupTransactionForm();
        app.setupCategoryForm();
    },

    showView: (view) => {
        document.getElementById('auth-view').style.display = 'none';
        document.getElementById('main-view').style.display = 'block';
        document.getElementById('nav-items').style.display = 'block';
    },

    initDashboard: async () => {
        app.showView('dashboard');
        await Promise.all([
            app.loadSummary(),
            app.loadTransactions(),
            app.loadCategories(),
            app.loadChart(),
            app.loadMonthlyChart()
        ]);
    },

    loadSummary: async () => {
        const response = await apiRequest('/transactions/stats/summary');
        if (response.ok) {
            const data = await response.json();
            document.getElementById('balance-total').textContent = `${data.balance.toFixed(0)} GNF`;
            document.getElementById('income-total').textContent = `${data.total_income.toFixed(0)} GNF`;
            document.getElementById('expense-total').textContent = `${data.total_expense.toFixed(0)} GNF`;
        }
    },

    loadTransactions: async () => {
        const type = document.getElementById('filter-type').value;
        const categoryId = document.getElementById('filter-category').value;
        const start = document.getElementById('filter-start').value;
        const end = document.getElementById('filter-end').value;
        const search = document.getElementById('filter-search').value;

        let query = `?type=${type}&category_id=${categoryId}&start_date=${start}&end_date=${end}&search=${encodeURIComponent(search)}`;

        const response = await apiRequest(`/transactions${query}`);
        if (response.ok) {
            const transactions = await response.json();
            const list = document.getElementById('transactions-list');
            if (transactions.length === 0) {
                list.innerHTML = '<p class="text-center text-muted my-5">Aucune transaction trouvée.</p>';
                return;
            }

            list.innerHTML = transactions.map(t => `
                <div class="transaction-item d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="me-3" style="width: 12px; height: 12px; border-radius: 50%; background: ${t.category_color}"></div>
                        <div>
                            <div class="fw-bold">${t.description || 'Sans description'}</div>
                            <div class="small text-muted">${t.date} • ${t.category}</div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="fw-bold me-3 ${t.type === 'revenu' ? 'text-income' : 'text-expense'}">
                            ${t.type === 'revenu' ? '+' : '-'} ${t.amount.toFixed(0)} GNF
                        </div>
                        <button class="btn btn-link btn-sm text-muted p-0 text-decoration-none" onclick="app.deleteTransaction(${t.id})">
                            <small>🗑️</small>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    },

    deleteTransaction: async (id) => {
        if (!confirm('Supprimer cette transaction ?')) return;
        const response = await apiRequest(`/transactions/${id}`, { method: 'DELETE' });
        if (response.ok) app.initDashboard();
    },

    loadCategories: async () => {
        const response = await apiRequest('/categories');
        if (response.ok) {
            const categories = await response.json();

            // For Transaction Modal
            const select = document.getElementById('trans-category');
            select.innerHTML = categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

            // For Filters
            const filterSelect = document.getElementById('filter-category');
            filterSelect.innerHTML = '<option value="">Toutes</option>' +
                categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

            // For Management Modal
            const manageList = document.getElementById('categories-manage-list');
            manageList.innerHTML = categories.map(c => `
                <div class="d-flex justify-content-between align-items-center mb-2 p-2 rounded" style="background: #f8fafc">
                    <div class="d-flex align-items-center">
                        <div class="me-2" style="width:15px; height:15px; border-radius:3px; background:${c.color}"></div>
                        <span>${c.name}</span>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="app.deleteCategory(${c.id})">Supprimer</button>
                </div>
            `).join('');
        }
    },

    deleteCategory: async (id) => {
        if (!confirm('Supprimer cette catégorie ? Toutes les transactions associées perdront leur catégorie.')) return;
        const response = await apiRequest(`/categories/${id}`, { method: 'DELETE' });
        if (response.ok) app.loadCategories();
    },

    loadChart: async () => {
        const response = await apiRequest('/transactions/stats/by-category');
        if (response.ok) {
            const data = await response.json();
            const ctx = document.getElementById('categoryChart').getContext('2d');

            if (app.categoryChart) app.categoryChart.destroy();

            if (data.length === 0) return;

            app.categoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.map(d => d.name),
                    datasets: [{
                        data: data.map(d => d.value),
                        backgroundColor: data.map(d => d.color),
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    cutout: '75%',
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    },

    loadMonthlyChart: async () => {
        const response = await apiRequest('/transactions/stats/monthly');
        if (response.ok) {
            const data = await response.json();
            const ctx = document.getElementById('monthlyChart').getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(d => d.month),
                    datasets: [
                        {
                            label: 'Revenus',
                            data: data.map(d => d.income),
                            backgroundColor: '#10b981',
                            borderRadius: 5
                        },
                        {
                            label: 'Dépenses',
                            data: data.map(d => d.expense),
                            backgroundColor: '#ef4444',
                            borderRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                        x: { grid: { display: false } }
                    },
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        }
    },

    setupTransactionForm: () => {
        const form = document.getElementById('transaction-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {
                type: document.getElementById('trans-type').value,
                amount: document.getElementById('trans-amount').value,
                category_id: document.getElementById('trans-category').value,
                date: document.getElementById('trans-date').value,
                description: document.getElementById('trans-desc').value
            };

            const response = await apiRequest('/transactions', {
                method: 'POST',
                body: JSON.stringify(body)
            });

            if (response.ok) {
                bootstrap.Modal.getInstance(document.getElementById('addTransactionModal')).hide();
                form.reset();
                app.initDashboard();
            }
        });
        document.getElementById('trans-date').valueAsDate = new Date();
    },

    setupCategoryForm: () => {
        const form = document.getElementById('category-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const body = {
                name: document.getElementById('new-cat-name').value,
                color: document.getElementById('new-cat-color').value
            };

            const response = await apiRequest('/categories', {
                method: 'POST',
                body: JSON.stringify(body)
            });

            if (response.ok) {
                form.reset();
                app.loadCategories();
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', app.init);
