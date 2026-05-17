const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3456;
const BASE_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
};

// Professional bundle order — presented together as one pack
const DOCUMENTS = [
    {
        num: 1,
        title: 'Website Maintenance & Management Agreement',
        file: 'clients/nas-design-construction/generated/Maintenance_Agreement_SLA-2026-001.html',
        icon: '🤝',
        ref: 'SLA-2026-001',
        purpose: 'The contract — scope, clauses, SLA terms, and client responsibilities.'
    },
    {
        num: 2,
        title: 'Invoice #INV-1001',
        file: 'clients/nas-design-construction/generated/Invoice_INV-1001.html',
        icon: '💳',
        ref: 'INV-1001',
        purpose: 'Upfront payment — development fee + 3-year maintenance lock-in.'
    },
    {
        num: 3,
        title: 'Project Acceptance & Sign-Off Certificate',
        file: 'clients/nas-design-construction/generated/Project_SignOff_CERT-2026-001.html',
        icon: '🏆',
        ref: 'CERT-2026-001',
        purpose: 'Final verification — client confirms delivery and closes the project.'
    }
];

function generateIndexPage() {
    const cards = DOCUMENTS.map(doc => `
        <a href="/${doc.file}" target="_blank" class="doc-card">
            <div class="doc-number">${doc.num}</div>
            <div class="doc-icon">${doc.icon}</div>
            <div class="doc-info">
                <div class="doc-tag">Document ${doc.num} of 3</div>
                <h3>${doc.title}</h3>
                <p class="doc-purpose">${doc.purpose}</p>
                <p class="doc-ref">${doc.ref}</p>
            </div>
            <div class="doc-arrow">→</div>
        </a>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NAS Design & Construction — Document Bundle</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            color: #e0e0e0;
        }
        .container {
            max-width: 860px;
            margin: 0 auto;
            padding: 50px 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 34px;
            font-weight: 700;
            background: linear-gradient(135deg, #FF8C1A, #FFB366);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .header .msme {
            margin-top: 6px;
            font-size: 11px;
            color: #FF8C1A;
            opacity: 0.7;
            letter-spacing: 0.5px;
        }
        .bundle-badge {
            text-align: center;
            margin: 25px 0 40px;
        }
        .bundle-badge span {
            display: inline-block;
            background: rgba(255,140,26,0.1);
            border: 1px solid rgba(255,140,26,0.25);
            color: #FFB366;
            padding: 8px 24px;
            border-radius: 30px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .client-bar {
            text-align: center;
            margin-bottom: 40px;
            padding: 16px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 10px;
        }
        .client-bar .label {
            font-size: 11px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }
        .client-bar .name {
            font-size: 18px;
            font-weight: 600;
            color: #fff;
        }
        .client-bar .date {
            font-size: 12px;
            color: #888;
            margin-top: 4px;
        }
        .doc-card {
            display: flex;
            align-items: center;
            gap: 20px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,140,26,0.12);
            border-radius: 14px;
            padding: 24px 28px;
            margin-bottom: 16px;
            text-decoration: none;
            color: inherit;
            transition: all 0.3s ease;
            position: relative;
        }
        .doc-card:hover {
            background: rgba(255,140,26,0.07);
            border-color: rgba(255,140,26,0.35);
            transform: translateX(4px);
            box-shadow: 0 6px 24px rgba(255,140,26,0.12);
        }
        .doc-number {
            position: absolute;
            top: -10px;
            left: -10px;
            width: 30px;
            height: 30px;
            background: linear-gradient(135deg, #FF8C1A, #D97008);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(255,140,26,0.4);
        }
        .doc-icon {
            font-size: 40px;
            flex-shrink: 0;
        }
        .doc-info {
            flex: 1;
        }
        .doc-tag {
            font-size: 10px;
            color: #FF8C1A;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .doc-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 4px;
        }
        .doc-purpose {
            font-size: 13px;
            color: #888;
            line-height: 1.4;
        }
        .doc-ref {
            font-size: 11px;
            color: #555;
            margin-top: 4px;
        }
        .doc-arrow {
            font-size: 22px;
            color: #FF8C1A;
            opacity: 0.4;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }
        .doc-card:hover .doc-arrow {
            opacity: 1;
            transform: translateX(4px);
        }
        .print-guide {
            margin-top: 35px;
            background: rgba(255,140,26,0.05);
            border: 1px solid rgba(255,140,26,0.15);
            border-radius: 12px;
            padding: 22px 28px;
        }
        .print-guide h3 {
            color: #FF8C1A;
            font-size: 14px;
            margin-bottom: 12px;
        }
        .print-steps {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }
        .step {
            background: rgba(255,255,255,0.05);
            padding: 6px 14px;
            border-radius: 6px;
            font-size: 12px;
            color: #aaa;
        }
        .step strong { color: #FFB366; }
        .step-arrow { color: #555; padding: 6px 0; }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 11px;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>A Generative Slice</h1>
            <div class="msme">MSME Udyam Registration No: UDYAM-TN-02-0471493</div>
        </div>
        <div class="bundle-badge">
            <span>📦 Client Document Bundle — 3 Documents</span>
        </div>
        <div class="client-bar">
            <div class="label">Prepared For</div>
            <div class="name">NAS Design & Construction</div>
            <div class="date">Portfolio Website • May 17, 2026</div>
        </div>
        ${cards}
        <div class="print-guide">
            <h3>🖨️ Print Each as PDF</h3>
            <div class="print-steps">
                <div class="step">Click document</div>
                <div class="step-arrow">→</div>
                <div class="step"><strong>Ctrl+P</strong></div>
                <div class="step-arrow">→</div>
                <div class="step">Save as PDF</div>
                <div class="step-arrow">→</div>
                <div class="step">A4 / No margins / <strong>Background graphics ON</strong></div>
            </div>
        </div>
        <div class="footer">
            http://localhost:${PORT}
        </div>
    </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(generateIndexPage());
        return;
    }

    let filePath = path.join(BASE_DIR, decodeURIComponent(req.url));
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n🟠 Document Bundle — http://localhost:${PORT}\n`);
    DOCUMENTS.forEach(doc => {
        console.log(`   ${doc.num}. ${doc.icon} ${doc.title}`);
    });
    console.log('');
});
