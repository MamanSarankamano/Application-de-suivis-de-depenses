/**
 * Configuration de la Devise - Suivi Dépenses
 * ============================================
 * Fichier centralisé pour gérer la devise de l'application
 */

const CURRENCY_CONFIG = {
    // Code de la devise (ISO 4217)
    code: 'GNF',

    // Symbole de la devise
    symbol: 'GNF',

    // Position du symbole ('before' ou 'after')
    symbolPosition: 'after',

    // Séparateur de milliers
    thousandsSeparator: ' ',

    // Séparateur décimal
    decimalSeparator: ',',

    // Nombre de décimales (GNF n'utilise généralement pas de décimales)
    decimals: 0,

    // Locale pour le formatage
    locale: 'fr-GN', // Français (Guinée)

    // Nom complet de la devise
    name: 'Franc Guinéen',

    // Nom court
    shortName: 'Franc'
};

/**
 * Formate un montant selon la configuration de la devise
 * @param {number} amount - Le montant à formater
 * @param {boolean} includeSymbol - Inclure le symbole de la devise
 * @returns {string} Le montant formaté
 */
function formatCurrency(amount, includeSymbol = true) {
    if (amount === null || amount === undefined || isNaN(amount)) {
        amount = 0;
    }

    // Convertir en nombre
    const numAmount = parseFloat(amount);

    // Formater le nombre selon la locale
    const formatted = numAmount.toLocaleString(CURRENCY_CONFIG.locale, {
        minimumFractionDigits: CURRENCY_CONFIG.decimals,
        maximumFractionDigits: CURRENCY_CONFIG.decimals
    });

    // Ajouter le symbole si demandé
    if (includeSymbol) {
        if (CURRENCY_CONFIG.symbolPosition === 'before') {
            return `${CURRENCY_CONFIG.symbol} ${formatted}`;
        } else {
            return `${formatted} ${CURRENCY_CONFIG.symbol}`;
        }
    }

    return formatted;
}

/**
 * Formate un montant avec signe (+ ou -)
 * @param {number} amount - Le montant à formater
 * @param {string} type - Type de transaction ('revenue' ou 'expense')
 * @returns {string} Le montant formaté avec signe
 */
function formatCurrencyWithSign(amount, type) {
    const sign = (type === 'revenue' || type === 'revenu') ? '+' : '-';
    const absAmount = Math.abs(amount);
    return `${sign}${formatCurrency(absAmount)}`;
}

/**
 * Parse un montant formaté en nombre
 * @param {string} formattedAmount - Le montant formaté
 * @returns {number} Le montant en nombre
 */
function parseCurrency(formattedAmount) {
    if (typeof formattedAmount === 'number') {
        return formattedAmount;
    }

    // Retirer le symbole et les espaces
    let cleaned = formattedAmount.replace(CURRENCY_CONFIG.symbol, '').trim();

    // Remplacer le séparateur de milliers
    cleaned = cleaned.replace(new RegExp(`\\${CURRENCY_CONFIG.thousandsSeparator}`, 'g'), '');

    // Remplacer le séparateur décimal par un point
    cleaned = cleaned.replace(CURRENCY_CONFIG.decimalSeparator, '.');

    return parseFloat(cleaned) || 0;
}

/**
 * Obtient le label du champ montant pour les formulaires
 * @returns {string} Le label formaté
 */
function getCurrencyInputLabel() {
    return `Montant (${CURRENCY_CONFIG.symbol})`;
}

/**
 * Obtient le placeholder pour les champs de montant
 * @returns {string} Le placeholder formaté
 */
function getCurrencyInputPlaceholder() {
    if (CURRENCY_CONFIG.decimals > 0) {
        return '0' + CURRENCY_CONFIG.decimalSeparator + '00';
    }
    return '0';
}

// Exporter la configuration et les fonctions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CURRENCY_CONFIG,
        formatCurrency,
        formatCurrencyWithSign,
        parseCurrency,
        getCurrencyInputLabel,
        getCurrencyInputPlaceholder
    };
}
