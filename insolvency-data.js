/**
 * THINK CAPITAL – INSOLVENCY ASSIGNMENTS DATA LAYER (Full Dataset)
 * --------------------------------------------------
 * This file acts as the source of truth for all insolvency assignments.
 * Data is automatically seeded into localStorage on first load.
 */

const STORAGE_KEY = 'tc_insolvency_data_v2';

const DEFAULT_DATA = [
    {
        id: 'essar-power',
        name: 'Essar Power (Jharkhand) Limited',
        status: 'Liquidation Process',
        statusType: 'status-liquidation',
        type: 'external',
        externalUrl: 'http://www.epjl.co.in/liquidation-process/',
        documents: []
    },
    {
        id: 'lanco-teesta',
        name: 'Lanco Teesta HydroPower Limited',
        status: 'Insolvency Process',
        statusType: 'status-external',
        type: 'external',
        externalUrl: 'http://www.lancogroup.com/DynTestform.aspx?pageid=125',
        documents: []
    },
    {
        id: 'shilpi-cable',
        name: 'Shilpi Cable Technologies Limited',
        status: 'Insolvency Process',
        statusType: 'status-external',
        type: 'external',
        externalUrl: 'https://www.shilpicables.com/',
        documents: []
    },
    {
        id: 'eurotas-infrastructure',
        name: 'Eurotas Infrastructure Limited',
        status: 'Liquidation',
        statusType: 'status-liquidation',
        type: 'internal',
        externalUrl: '',
        documents: [
            { id: 'd1', name: 'Claim Form C – Operational Creditor (except Workmen or Employee)', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Claim-Form_C_Operational-Creditor-except-Workmen-or-Employee.pdf' },
            { id: 'd2', name: 'Claim Form D – Financial Creditor', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Claim-Form_D_Financial-Creditor.pdf' },
            { id: 'd3', name: 'Claim Form E – Workmen or Employee', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Claim-Form_E_Workmen-or-Employee.pdf' },
            { id: 'd4', name: 'Claim Form F – Representative of Workmen or Employee', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Claim-Form_F_Representative-of-Workmen-or-Employee.pdf' },
            { id: 'd5', name: 'Claim Form G – Other Stakeholders', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Claim-Form_G_Other-Stakeholders.pdf' },
            { id: 'd6', name: 'Liquidation Order – Eurotas Infrastructure Limited', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Liquidation-Order_Eurotas-Infrastructure-Limited.pdf' },
            { id: 'd7', name: 'Public Announcement (Form B) – Eurotas Infrastructure Limited', url: 'https://thinkcapital.in/wp-content/uploads/2023/10/Public-Announcement_FormB_Eurotas-Infrastructure-Limited.pdf' },
            { id: 'd8', name: 'E-Auction Public Announcement – Auction 3', url: 'https://thinkcapital.in/wp-content/uploads/2024/06/EIL-E-Auction-Public-Announcement-Auction-3.pdf' },
            { id: 'd9', name: 'Public Announcement – Auction 14', url: 'https://thinkcapital.in/wp-content/uploads/2026/03/EIL-E-Auction-Public-Announcement-Auction-14.pdf' },
            { id: 'd10', name: 'E-Auction Sale Notice – Auction 3', url: 'https://thinkcapital.in/wp-content/uploads/2024/06/EIL-E-Auction-Sale-Notice-Auction-3.pdf' },
            { id: 'd11', name: 'Sale Notice – Auction 14', url: 'https://thinkcapital.in/wp-content/uploads/2026/03/EIL-E-Auction-Sale-Notice-Auction-14.pdf' },
            { id: 'd12', name: 'E-Auction Process Memorandum – Auction 14', url: 'https://thinkcapital.in/wp-content/uploads/2026/03/EIL-E-Auction-Process-Memorandum-Auction-14.pdf' }
        ]
    },
    {
        id: 'lanco-solar',
        name: 'Lanco Solar Power Limited',
        status: 'Insolvency Process',
        statusType: 'status-external',
        type: 'external',
        externalUrl: 'http://www.lancogroup.com/DynTestform.aspx?pageid=139',
        documents: []
    },
    {
        id: 'zicom-security',
        name: 'Zicom Electronic Security Systems Limited',
        status: 'Insolvency Process',
        statusType: 'status-external',
        type: 'external',
        externalUrl: 'https://zicom.com/zicom-insolvency-process/',
        documents: []
    },
    {
        id: 'coronet-properties',
        name: 'Coronet Properties and Investments Private Limited',
        status: 'Insolvency Process',
        statusType: 'status-external',
        type: 'external',
        externalUrl: 'https://zicom.com/cpipl-insolvency-process/',
        documents: []
    },
    {
        id: 'ind-barath',
        name: 'Ind-Barath Power Infra Limited',
        status: 'Insolvency Process',
        statusType: 'status-external',
        type: 'external',
        externalUrl: 'https://www.ibpil.com/',
        documents: []
    },
    {
        id: 'simm-samm',
        name: 'Simm Samm Hotels Private Limited',
        status: 'CIRP',
        statusType: 'status-cirp',
        type: 'internal',
        externalUrl: '',
        documents: [
            { id: 'd1', name: 'CIRP Admission Order – April 12, 2023', url: 'https://thinkcapital.in/wp-content/uploads/2023/11/CIRP_Admission_Order_12_04_2023.pdf' },
            { id: 'd2', name: 'Form A – Public Announcement', url: 'https://thinkcapital.in/wp-content/uploads/2023/11/Form-A-Public-Announcement.pdf' },
            { id: 'd3', name: 'List of Creditors – October 23, 2023', url: 'https://thinkcapital.in/wp-content/uploads/2023/11/List_of_Creditors-October_23_2023.pdf' },
            { id: 'd4', name: 'SSHPL – Teaser', url: 'https://thinkcapital.in/wp-content/uploads/2023/11/SSHPL-Teaser.pdf' },
            { id: 'd5', name: 'Form G – July 8, 2023', url: 'https://thinkcapital.in/wp-content/uploads/2023/11/Form-G-July-8-2023.pdf' }
        ]
    },
    {
        id: 'mehadia-sales',
        name: 'Mehadia Sales Trade Corporation Private Limited',
        status: 'CIRP',
        statusType: 'status-cirp',
        type: 'internal',
        externalUrl: '',
        documents: [
            { id: 'd1', name: 'MSTCPL Process Summary', url: 'https://thinkcapital.in/wp-content/uploads/2023/11/MSTCPL-Process-Summary.pdf' }
        ]
    },
    {
        id: 'agrimas-chemicals',
        name: 'Agrimas Chemicals Limited',
        status: 'CIRP',
        statusType: 'status-cirp',
        type: 'internal',
        externalUrl: '',
        documents: [
            { id: 'd1', name: 'CIRP Order – January 30, 2025', url: 'https://thinkcapital.in/wp-content/uploads/2025/04/NCLT-Order-dated-January-30-2025.pdf' },
            { id: 'd2', name: 'Form A – Public Announcement – February 01, 2025', url: 'https://thinkcapital.in/wp-content/uploads/2025/04/PA-Agrimas-Chemicals-Limited-1-feb-2025.pdf' }
        ]
    }
];

function getAssignments() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore parse errors */ }
    
    // Seed defaults on first load/reset
    saveAssignments(DEFAULT_DATA);
    return DEFAULT_DATA;
}

function saveAssignments(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
}

function getAssignmentById(id) {
    return getAssignments().find(a => a.id === id) || null;
}

function slugify(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .substring(0, 40) + '-' + Math.random().toString(36).substr(2, 4);
}

function newDocId() {
    return 'doc-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
}
