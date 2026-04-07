#!/usr/bin/env node

/**
 * Document Generator Script
 *
 * Automates the process of generating documents from templates by replacing placeholders
 * with actual values from a data file.
 *
 * Usage:
 *   node scripts/generate-document.js <template-type> <client-name> <data-file>
 *
 * Example:
 *   node scripts/generate-document.js invoice my-client data.json
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateArgs() {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        log('❌ Error: Missing required arguments', 'red');
        log('\nUsage:', 'yellow');
        log('  node scripts/generate-document.js <template-type> <client-name> <data-file>\n', 'cyan');
        log('Template types:', 'yellow');
        log('  - invoice', 'cyan');
        log('  - maintenance-agreement', 'cyan');
        log('  - signoff-certificate', 'cyan');
        log('\nExample:', 'yellow');
        log('  node scripts/generate-document.js invoice nas-design-construction invoice-data.json\n', 'cyan');
        process.exit(1);
    }

    return {
        templateType: args[0],
        clientName: args[1],
        dataFile: args[2],
    };
}

function loadTemplate(templateType) {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateType}.html`);

    if (!fs.existsSync(templatePath)) {
        log(`❌ Error: Template not found: ${templatePath}`, 'red');
        log('\nAvailable templates:', 'yellow');
        const templatesDir = path.join(__dirname, '..', 'templates');
        fs.readdirSync(templatesDir).forEach(file => {
            if (file.endsWith('.html')) {
                log(`  - ${file.replace('.html', '')}`, 'cyan');
            }
        });
        process.exit(1);
    }

    return fs.readFileSync(templatePath, 'utf8');
}

function loadData(dataFile) {
    if (!fs.existsSync(dataFile)) {
        log(`❌ Error: Data file not found: ${dataFile}`, 'red');
        process.exit(1);
    }

    try {
        const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
        return data;
    } catch (error) {
        log(`❌ Error: Invalid JSON in data file: ${error.message}`, 'red');
        process.exit(1);
    }
}

function replacePlaceholders(template, data) {
    let output = template;
    const placeholders = [];

    // Find all placeholders in the template
    const placeholderRegex = /\{\{([A-Z_0-9]+)\}\}/g;
    let match;
    while ((match = placeholderRegex.exec(template)) !== null) {
        placeholders.push(match[1]);
    }

    // Replace each placeholder with data
    const missingPlaceholders = [];
    placeholders.forEach(placeholder => {
        if (data.hasOwnProperty(placeholder)) {
            const regex = new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g');
            output = output.replace(regex, data[placeholder]);
        } else {
            missingPlaceholders.push(placeholder);
        }
    });

    // Report missing placeholders
    if (missingPlaceholders.length > 0) {
        log('\n⚠️  Warning: Missing data for placeholders:', 'yellow');
        missingPlaceholders.forEach(p => log(`  - ${p}`, 'yellow'));
        log('');
    }

    return output;
}

function ensureClientDirectory(clientName) {
    const clientDir = path.join(__dirname, '..', 'clients', clientName);
    const generatedDir = path.join(clientDir, 'generated');
    const signedDir = path.join(clientDir, 'signed');

    if (!fs.existsSync(clientDir)) {
        fs.mkdirSync(clientDir, { recursive: true });
    }
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir, { recursive: true });
    }
    if (!fs.existsSync(signedDir)) {
        fs.mkdirSync(signedDir, { recursive: true });
    }

    return generatedDir;
}

function generateFileName(templateType, data) {
    const typeMap = {
        'invoice': data.INVOICE_NUMBER || 'INVOICE',
        'maintenance-agreement': data.AGREEMENT_REFERENCE || 'AGREEMENT',
        'signoff-certificate': data.CERT_REFERENCE || 'CERTIFICATE',
    };

    const typeName = {
        'invoice': 'Invoice',
        'maintenance-agreement': 'Maintenance_Agreement',
        'signoff-certificate': 'Project_SignOff',
    };

    const id = typeMap[templateType] || 'DOCUMENT';
    const name = typeName[templateType] || 'Document';

    return `${name}_${id}.html`;
}

function main() {
    log('\n🚀 A Generative Slice - Document Generator\n', 'bright');

    const { templateType, clientName, dataFile } = validateArgs();

    log(`📄 Template: ${templateType}`, 'cyan');
    log(`👤 Client: ${clientName}`, 'cyan');
    log(`📊 Data: ${dataFile}\n`, 'cyan');

    // Load template
    log('Loading template...', 'yellow');
    const template = loadTemplate(templateType);
    log('✓ Template loaded', 'green');

    // Load data
    log('Loading data...', 'yellow');
    const data = loadData(dataFile);
    log('✓ Data loaded', 'green');

    // Replace placeholders
    log('Generating document...', 'yellow');
    const output = replacePlaceholders(template, data);
    log('✓ Document generated', 'green');

    // Ensure client directory exists
    const generatedDir = ensureClientDirectory(clientName);

    // Generate file name
    const fileName = generateFileName(templateType, data);
    const outputPath = path.join(generatedDir, fileName);

    // Write output file
    fs.writeFileSync(outputPath, output);

    log(`\n✅ Success! Document created at:`, 'green');
    log(`   ${outputPath}\n`, 'bright');

    // Validation hint
    log('💡 Tip: Run validation script to verify the document:', 'cyan');
    log('   node scripts/validate-document.js ' + outputPath + '\n', 'cyan');
}

// Run the script
main();
