/**
 * THINK CAPITAL – TRANSACTIONS DATA LAYER
 * --------------------------------------------------
 * This file acts as the source of truth for all PE-M&A
 * and Debt Advisory transactions.
 * Data is managed via localStorage through the Admin CMS.
 */

const PE_MA_STORAGE_KEY = 'tc_pema_transactions_v2';
const DEBT_STORAGE_KEY = 'tc_debt_transactions_v2';

/* ---------- PLACEHOLDER LOGO ---------- */
// Simple inline SVG data URI used as a universal placeholder logo
const PLACEHOLDER_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='60' viewBox='0 0 160 60'%3E%3Crect width='160' height='60' rx='8' fill='%23f1f5f9'/%3E%3Ctext x='80' y='35' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%2394a3b8'%3ECompany Logo%3C/text%3E%3C/svg%3E";

/* ---------- DEFAULT PE & M&A DATA ---------- */
const DEFAULT_PE_MA_DATA = [
    {
        id: 'salt-lotus',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Salt Rituals Reimagined',
        name: 'Manor Rama Care Private Limited',
        nameSub: '',
        type: 'Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Lotus Herbals',
        service: 'Private Equity Advisory'
    },
    {
        id: 'armc-birla',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'ARMC IVF Fertility Centre',
        name: 'Asian Reproductive Centre Private Limited',
        nameSub: '',
        type: 'Acquisition by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Birla Fertility & IVF',
        service: 'M&A Advisory'
    },
    {
        id: 'watertec-warburg',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Watertec',
        name: 'Watertec (India) Private Limited',
        nameSub: '',
        type: 'Acquisition by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Warburg Pincus',
        service: 'M&A Advisory'
    },
    {
        id: 'lanco-nhpc',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Lanco',
        name: 'Lanco Teesta Hydro Power Limited',
        nameSub: '',
        type: 'Acquisition by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'NHPC',
        service: 'M&A Advisory'
    },
    {
        id: 'sakthi-portugal',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sakthi Portugal',
        name: 'Sakthi Portugal S.A',
        nameSub: '',
        type: 'Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Oxy Capital',
        service: 'Private Equity Advisory'
    },
    {
        id: 'bannari-madras',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Bannari Amman Sugars',
        name: 'Bannari Amman Sugars Limited',
        nameSub: '',
        type: 'Acquisition and Merger of',
        counterpartyLogo: '',
        counterpartyName: 'Madras Sugars Limited',
        service: 'M&A Advisory'
    },
    {
        id: 'sree-ramakrishna',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sree Ramakrishna Alloys',
        name: 'Sree Ramakrishna Alloys Limited',
        nameSub: '',
        type: 'Acquisition of',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Sujana',
        service: 'M&A Advisory'
    },
    {
        id: 'natureland-sidbi',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Natureland Organics',
        name: 'Natureland Organic Foods Private Limited',
        nameSub: '',
        type: 'Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'SIDBI Venture',
        service: 'Private Equity Advisory'
    },
    {
        id: 'ritewater-sidbi',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Rite Water',
        name: 'Rite Water Solution (India) Private Limited',
        nameSub: '',
        type: 'Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'SIDBI Venture',
        service: 'Private Equity Advisory'
    },
    {
        id: 'sakthi-global-aapico',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sakthi Global',
        name: 'Sakthi Global Auto Holding',
        nameSub: '',
        type: 'Follow-on Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Aapico',
        service: 'M&A Advisory'
    },
    {
        id: 'appachi-grassroots',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Appachi Cotton',
        name: 'Appachi Cotton Limited',
        nameSub: '',
        type: 'Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Grassroots Business Fund',
        service: 'Private Equity'
    },
    {
        id: 'pankaj-moolchand',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Pankaj Hospitals',
        name: 'Pankaj Hospitals Limited',
        nameSub: '',
        type: 'Strategic Acquisition by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Moolchand Health Happiness Life',
        service: 'M&A Advisory'
    },
    {
        id: 'gnrc-canbank',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'GNRC Limited',
        name: 'GNRC Limited',
        nameSub: '',
        type: 'Investment by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Canbank VC',
        service: 'Private Equity Advisory'
    },
    {
        id: 'sakthi-sugars-ipl',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sakthi Sugars',
        name: 'Sakthi Sugars Limited',
        nameSub: 'Sale of Dhenkanal Unit',
        type: 'Acquisition by',
        counterpartyLogo: PLACEHOLDER_LOGO,
        counterpartyName: 'Indian Potash Limited',
        service: 'M&A Advisory'
    },
    {
        id: 'hindustan-gauri',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Hindusthan Group',
        name: 'Hindustan Group of Industries',
        nameSub: '',
        type: 'Acquisition of',
        counterpartyLogo: '',
        counterpartyName: 'Gauri Distillery',
        service: 'M&A Advisory'
    }
];

/* ---------- DEFAULT DEBT ADVISORY DATA ---------- */
const DEFAULT_DEBT_DATA = [
    {
        id: 'essar-power-jharkhand',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Essar Power',
        name: 'Essar Power (Jharkhand) Limited',
        type: 'Acquisition by',
        counterpartyName: 'Rashmi Group',
        service: 'Debt Raising Advisory'
    },
    {
        id: 'integrated-induction',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Integrated Induction',
        name: 'Integrated Induction Power Limited',
        type: 'Structured Finance',
        counterpartyName: 'Kotak Mahindra Bank',
        service: 'Debt Raising Advisory'
    },
    {
        id: 'zicom-electronic',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Zicom',
        name: 'Zicom Electronic Security Systems Limited',
        type: 'Acquisition by',
        counterpartyName: 'Advaita Trading Private Limited',
        service: 'Debt Resolution Advisory'
    },
    {
        id: 'sakthi-sugars-settlement',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sakthi Sugars',
        name: 'Sakthi Sugars Limited',
        nameSub: 'Structured Finance for Settlement of Debts',
        type: 'Financed by',
        counterpartyName: 'Kotak Mahindra Bank',
        service: 'Debt Resolution Advisory'
    },
    {
        id: 'lanco-teesta-nhpc',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Lanco',
        name: 'Lanco Teesta Hydro Power Limited',
        type: 'Acquisition by',
        counterpartyName: 'NHPC',
        service: 'Debt Resolution Advisory'
    },
    {
        id: 'sakthi-auto-component',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sakthi Auto',
        name: 'Sakthi Auto Component Limited',
        nameSub: 'Structured Finance for Buyback of Shareholding',
        type: 'Financed by',
        counterpartyName: 'Kotak Mahindra Bank',
        service: 'Debt Raising Advisory'
    },
    {
        id: 'shilpi-cable-acquisition',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Shilpi Cable',
        name: 'Shilpi Cable Technologies Limited',
        type: 'Acquisition by',
        counterpartyName: 'Associated Power Unleashed',
        service: 'Debt Resolution Advisory'
    },
    {
        id: 'consolidated-construction',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'CCCL',
        name: 'Consolidated Construction Consortium Limited',
        type: 'Corporate Debt Restructuring & Strategic Debt Restructuring',
        counterpartyName: '',
        service: 'Debt Resolution Advisory'
    },
    {
        id: 'get-power-limited',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'G.E.T. Power',
        name: 'G.E.T. Power Limited',
        type: 'Restructuring of Debts with Consortium of Lenders',
        counterpartyName: '',
        service: 'Debt Advisory'
    },
    {
        id: 'arya-vaidya-pharmacy',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'AVP',
        name: 'Arya Vaidya Pharmacy (Coimbatore) Limited',
        type: 'Refinancing of Debt',
        counterpartyName: 'HDFC Bank',
        service: 'Debt Raising Advisory'
    },
    {
        id: 'diamond-engineering',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Diamond Engineering',
        name: 'Diamond Engineering (Chennai) Private Limited',
        type: 'Restructuring of Debts with Consortium of Lenders',
        counterpartyName: '',
        service: 'Debt Advisory'
    },
    {
        id: 'sakthi-global-buyout',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Sakthi Global',
        name: 'Sakthi Global Auto Holding',
        nameSub: 'Structured Leverage Buyout Finance',
        type: 'Financed by',
        counterpartyName: 'Barclays',
        service: 'Debt Raising Advisory'
    },
    {
        id: 'shree-renuga-textiles',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Shree Renuga',
        name: 'Shree Renuga Textiles Limited',
        type: 'Restructuring of Debts with Consortium of Lenders',
        counterpartyName: '',
        service: 'Debt Advisory'
    },
    {
        id: 'gangotri-textiles',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'Gangotri Textiles',
        name: 'Gangotri Textiles Limited',
        type: 'Restructuring of Debts with Consortium of Lenders',
        counterpartyName: '',
        service: 'Debt Advisory'
    },
    {
        id: 'jbf-industries-debt',
        logo: PLACEHOLDER_LOGO,
        logoAlt: 'JBF',
        name: 'JBF Industries Limited',
        type: 'Structured Debt',
        counterpartyName: 'IDBI Bank',
        service: 'Debt Raising Advisory'
    }
];

/* ---------- GETTER / SETTER (PE & M&A) ---------- */
function getPEMATransactions() {
    try {
        const raw = localStorage.getItem(PE_MA_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    savePEMATransactions(DEFAULT_PE_MA_DATA);
    return [...DEFAULT_PE_MA_DATA];
}

function savePEMATransactions(data) {
    localStorage.setItem(PE_MA_STORAGE_KEY, JSON.stringify(data));
}

function getPEMATransactionById(id) {
    return getPEMATransactions().find(t => t.id === id) || null;
}

/* ---------- GETTER / SETTER (Debt Advisory) ---------- */
function getDebtTransactions() {
    try {
        const raw = localStorage.getItem(DEBT_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    saveDebtTransactions(DEFAULT_DEBT_DATA);
    return [...DEFAULT_DEBT_DATA];
}

function saveDebtTransactions(data) {
    localStorage.setItem(DEBT_STORAGE_KEY, JSON.stringify(data));
}

function getDebtTransactionById(id) {
    return getDebtTransactions().find(t => t.id === id) || null;
}

/* ---------- SHARED UTILITIES ---------- */
function generateTransactionId(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 40) + '-' + Math.random().toString(36).substr(2, 4);
}
