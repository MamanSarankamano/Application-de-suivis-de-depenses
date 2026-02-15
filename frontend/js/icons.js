/**
 * Configuration des icônes et couleurs pour les catégories
 * Conforme au cahier des charges - Charte graphique
 */

const CATEGORY_CONFIG = {
    // Catégories de dépenses
    'Alimentaire': {
        img: 'Img/food.png',
        color: '#16A34A',
        type: 'expense'
    },
    'Transport': {
        img: 'Img/transport1.png',
        color: '#06B6D4',
        type: 'expense'
    },
    'Logement': {
        img: 'Img/logement.png',
        color: '#F59E0B',
        type: 'expense'
    },
    'Divertissement': {
        img: 'Img/divertissement.png',
        color: '#9333EA',
        type: 'expense'
    },
    'Autres': {
        img: 'Img/autres_depenses.png',
        color: '#6B7280',
        type: 'expense'
    },

    // Catégories de revenus
    'Salaire': {
        img: 'Img/salaire.png',
        color: '#16A34A',
        type: 'revenue'
    },
    'Aide': {
        img: 'Img/aides.png',
        color: '#16A34A',
        type: 'revenue'
    },
    'Business': {
        img: 'Img/Business.png',
        color: '#16A34A',
        type: 'revenue'
    }
};

/**
 * Icônes d'actions
 */
const ACTION_ICONS = {
    add: 'fa-plus',
    edit: 'fa-edit',
    delete: 'fa-trash',
    filter: 'fa-filter',
    search: 'fa-search',
    export: 'fa-download',
    settings: 'fa-cog',
    logout: 'fa-sign-out-alt',
    user: 'fa-user-circle',
    calendar: 'fa-calendar-alt',
    chart: 'fa-chart-pie',
    list: 'fa-list-ul',
    save: 'fa-save',
    cancel: 'fa-times',
    check: 'fa-check',
    info: 'fa-info-circle',
    warning: 'fa-exclamation-triangle',
    error: 'fa-exclamation-circle'
};

/**
 * Génère le HTML pour une icône de catégorie
 * @param {string} categoryName - Nom de la catégorie
 * @param {string} size - Taille (small, medium, large)
 * @returns {string} HTML de l'icône
 */
function getCategoryIcon(categoryName, size = 'medium') {
    const config = CATEGORY_CONFIG[categoryName] || CATEGORY_CONFIG['Autres'];
    const sizeClass = {
        small: 'icon-sm',
        medium: 'icon-md',
        large: 'icon-lg'
    }[size] || 'icon-md';

    const iconContent = config.img
        ? `<img src="${config.img}" alt="${categoryName}" style="width: 100%; height: 100%; object-fit: contain;">`
        : `<i class="fas ${config.icon}" style="color: ${config.color};"></i>`;

    return `
        <div class="category-icon ${sizeClass}" style="background-color: ${config.color}15; overflow: hidden; padding: 5px;">
            ${iconContent}
        </div>
    `;
}

/**
 * Génère le HTML pour une icône d'action
 * @param {string} actionName - Nom de l'action
 * @param {string} color - Couleur personnalisée (optionnel)
 * @returns {string} HTML de l'icône
 */
function getActionIcon(actionName, color = null) {
    const iconClass = ACTION_ICONS[actionName] || ACTION_ICONS['info'];
    const style = color ? `style="color: ${color};"` : '';

    return `<i class="fas ${iconClass}" ${style}></i>`;
}

/**
 * Crée un élément d'icône de catégorie dans le DOM
 * @param {string} categoryName - Nom de la catégorie
 * @param {string} size - Taille
 * @returns {HTMLElement} Élément DOM
 */
function createCategoryIconElement(categoryName, size = 'medium') {
    const config = CATEGORY_CONFIG[categoryName] || CATEGORY_CONFIG['Autres'];
    const sizeClass = {
        small: 'icon-sm',
        medium: 'icon-md',
        large: 'icon-lg'
    }[size] || 'icon-md';

    const container = document.createElement('div');
    container.className = `category-icon ${sizeClass}`;
    container.style.backgroundColor = `${config.color}15`;
    container.style.overflow = 'hidden';
    container.style.padding = '5px';

    if (config.img) {
        const img = document.createElement('img');
        img.src = config.img;
        img.alt = categoryName;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        container.appendChild(img);
    } else {
        const icon = document.createElement('i');
        icon.className = `fas ${config.icon}`;
        icon.style.color = config.color;
        container.appendChild(icon);
    }

    return container;
}

/**
 * Obtient la couleur d'une catégorie
 * @param {string} categoryName - Nom de la catégorie
 * @returns {string} Code couleur hexadécimal
 */
function getCategoryColor(categoryName) {
    const config = CATEGORY_CONFIG[categoryName] || CATEGORY_CONFIG['Autres'];
    return config.color;
}

/**
 * Obtient toutes les catégories par type
 * @param {string} type - 'expense' ou 'revenue'
 * @returns {Array} Liste des catégories
 */
function getCategoriesByType(type) {
    return Object.entries(CATEGORY_CONFIG)
        .filter(([_, config]) => config.type === type)
        .map(([name, config]) => ({
            name,
            icon: config.icon,
            color: config.color
        }));
}

/**
 * Génère un sélecteur de couleur pour les catégories personnalisées
 * @returns {Array} Palette de couleurs
 */
function getColorPalette() {
    return [
        '#16A34A', // Vert
        '#3B82F6', // Bleu
        '#F59E0B', // Orange
        '#DC2626', // Rouge
        '#9333EA', // Violet
        '#EC4899', // Rose
        '#06B6D4', // Cyan
        '#84CC16', // Lime
        '#F97316', // Orange foncé
        '#6B7280'  // Gris
    ];
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CATEGORY_CONFIG,
        ACTION_ICONS,
        getCategoryIcon,
        getActionIcon,
        createCategoryIconElement,
        getCategoryColor,
        getCategoriesByType,
        getColorPalette
    };
}
