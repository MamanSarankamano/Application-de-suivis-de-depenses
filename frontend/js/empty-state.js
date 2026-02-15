/**
 * Composant état vide réutilisable - rend l'UX chaleureuse
 */

const EMPTY_ILLUSTRATIONS = {
    transactions: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" fill="none" class="empty-state-img" aria-hidden="true">
      <path d="M40 80h120M40 60h80M40 100h60" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <circle cx="60" cy="40" r="24" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.4)" stroke-width="2"/>
      <path d="M52 40l6 6 10-12" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="100" y="145" text-anchor="middle" fill="currentColor" opacity="0.4" font-size="12" font-family="Outfit,sans-serif">Aucune opération</text>
    </svg>`,
    categories: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" fill="none" class="empty-state-img" aria-hidden="true">
      <rect x="30" y="50" width="50" height="55" rx="10" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.35)" stroke-width="2"/>
      <rect x="85" y="35" width="50" height="55" rx="10" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.35)" stroke-width="2"/>
      <rect x="120" y="70" width="50" height="55" rx="10" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" stroke-width="2"/>
      <text x="100" y="145" text-anchor="middle" fill="currentColor" opacity="0.4" font-size="12" font-family="Outfit,sans-serif">Catégories</text>
    </svg>`,
    stats: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" fill="none" class="empty-state-img" aria-hidden="true">
      <path d="M30 120V80l30-25 25 15 30-40 40 70v60" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.35" fill="rgba(6,182,212,0.06)"/>
      <circle cx="60" cy="55" r="8" fill="#06B6D4" opacity="0.8"/>
      <circle cx="115" cy="70" r="8" fill="#10B981" opacity="0.8"/>
      <text x="100" y="155" text-anchor="middle" fill="currentColor" opacity="0.4" font-size="12" font-family="Outfit,sans-serif">Statistiques</text>
    </svg>`,
    default: `<div class="empty-state-img" style="width: 140px; height: 140px; margin: 0 auto 1.5rem; border-radius: 50%; background: linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(16,185,129,0.08) 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; color: var(--color-cyan);"><i class="fas fa-inbox" aria-hidden="true"></i></div>`
};

function renderEmptyState(containerId, options = {}) {
    const {
        illustration = 'default',
        title = 'Aucune donnée pour le moment',
        text = 'Commencez à ajouter des éléments pour voir vos statistiques ici.',
        primaryLabel = 'Commencer',
        primaryHref = '#',
        primaryOnClick = null
    } = options;

    const container = document.getElementById(containerId);
    if (!container) return;

    const imgHtml = EMPTY_ILLUSTRATIONS[illustration] || EMPTY_ILLUSTRATIONS.default;
    const primary = primaryHref ? `<a href="${primaryHref}" class="btn-premium">${primaryLabel}</a>` :
        `<button type="button" class="btn-premium" ${primaryOnClick ? `onclick="${primaryOnClick}"` : ''}>${primaryLabel}</button>`;

    container.innerHTML = `
        <div class="empty-state" role="status">
            <div class="empty-state-illus">${imgHtml}</div>
            <h3 class="empty-state-title">${title}</h3>
            <p class="empty-state-text">${text}</p>
            <div class="empty-state-actions">${primary}</div>
        </div>
    `;
}

function renderDemoBanner(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !window.DEMO_DATA || !window.DEMO_DATA.useDemoData()) return;

    container.innerHTML = `
        <div class="demo-banner" role="region" aria-label="Mode démonstration">
            <div class="demo-banner-left">
                <div class="demo-banner-icon"><i class="fas fa-magic" aria-hidden="true"></i></div>
                <div class="demo-banner-text">
                    Données de démonstration
                    <small>Le site affiche des données simulées pour vous permettre de découvrir toutes les fonctionnalités.</small>
                </div>
            </div>
            <button type="button" class="demo-banner-dismiss" aria-label="Masquer le message">Masquer</button>
        </div>
    `;

    const dismiss = container.querySelector('.demo-banner-dismiss');
    if (dismiss) {
        dismiss.addEventListener('click', () => {
            if (window.DEMO_DATA && window.DEMO_DATA.setDemoMode) {
                try { window.DEMO_DATA.setDemoMode(false); } catch (e) {}
            }
            container.querySelector('.demo-banner').style.display = 'none';
        });
    }
}

window.renderEmptyState = renderEmptyState;
window.renderDemoBanner = renderDemoBanner;
