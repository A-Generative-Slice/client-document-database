#!/usr/bin/env node

/**
 * Document Validator Script
 *
 * Validates generated documents to ensure they follow brand guidelines:
 * - Uses brand.css (no inline CSS)
 * - Contains no unreplaced placeholders
 * - Has proper document structure
 * - Follows naming conventions
 *
 * Usage:
 *   node scripts/validate-document.js <document-path>
 *
 * Example:
 *   node scripts/validate-document.js clients/my-client/generated/Invoice_INV-1001.html
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

class DocumentValidator {
    constructor(filePath) {
        this.filePath = filePath;
        this.content = '';
        this.errors = [];
        this.warnings = [];
        this.passed = 0;
        this.failed = 0;
    }

    loadDocument() {
        if (!fs.existsSync(this.filePath)) {
            log(`❌ Error: File not found: ${this.filePath}`, 'red');
            process.exit(1);
        }

        this.content = fs.readFileSync(this.filePath, 'utf8');
    }

    validateCSSReference() {
        log('\n🎨 Checking CSS reference...', 'cyan');

        // Check for brand.css reference
        const hasBrandCSS = this.content.includes('design-system/brand.css');

        if (!hasBrandCSS) {
            this.errors.push('Document does not reference brand.css');
            this.failed++;
            log('  ❌ FAIL: No reference to brand.css found', 'red');
            log('      Expected: <link rel="stylesheet" href="...design-system/brand.css">', 'yellow');
        } else {
            this.passed++;
            log('  ✓ PASS: References brand.css', 'green');
        }

        // Check for inline styles
        const hasInlineCSS = this.content.includes('<style>') || this.content.match(/<[^>]+style\s*=\s*["'][^"']*["']/);

        if (hasInlineCSS) {
            this.warnings.push('Document contains inline CSS styles');
            log('  ⚠️  WARNING: Inline CSS detected', 'yellow');
            log('      Brand guidelines recommend using brand.css only', 'yellow');
        } else {
            this.passed++;
            log('  ✓ PASS: No inline CSS detected', 'green');
        }
    }

    validatePlaceholders() {
        log('\n📝 Checking for unreplaced placeholders...', 'cyan');

        const placeholderRegex = /\{\{([A-Z_0-9]+)\}\}/g;
        const unreplacedPlaceholders = [];
        let match;

        while ((match = placeholderRegex.exec(this.content)) !== null) {
            unreplacedPlaceholders.push(match[1]);
        }

        if (unreplacedPlaceholders.length > 0) {
            this.errors.push(`Found ${unreplacedPlaceholders.length} unreplaced placeholder(s)`);
            this.failed++;
            log(`  ❌ FAIL: ${unreplacedPlaceholders.length} unreplaced placeholder(s):`, 'red');
            unreplacedPlaceholders.forEach(p => log(`      - {{${p}}}`, 'yellow'));
        } else {
            this.passed++;
            log('  ✓ PASS: All placeholders replaced', 'green');
        }
    }

    validateDocumentStructure() {
        log('\n🏗️  Checking document structure...', 'cyan');

        const requiredElements = [
            { name: 'DOCTYPE', pattern: /<!DOCTYPE html>/i },
            { name: 'HTML tag', pattern: /<html[^>]*>/i },
            { name: 'HEAD section', pattern: /<head[^>]*>/i },
            { name: 'BODY section', pattern: /<body[^>]*>/i },
            { name: 'Container div', pattern: /<div class="container">/i },
            { name: 'Header section', pattern: /<div class="header">/i },
        ];

        requiredElements.forEach(({ name, pattern }) => {
            if (pattern.test(this.content)) {
                this.passed++;
                log(`  ✓ PASS: ${name} found`, 'green');
            } else {
                this.errors.push(`Missing required element: ${name}`);
                this.failed++;
                log(`  ❌ FAIL: ${name} not found`, 'red');
            }
        });
    }

    validateBrandElements() {
        log('\n🎨 Checking brand elements...', 'cyan');

        const brandElements = [
            { name: 'Logo text "A Generative Slice"', pattern: /A Generative Slice/i },
            { name: 'Logo subtitle', pattern: /Professional Web Development & Maintenance Services/i },
            { name: 'Contact email', pattern: /agenerativeslice@gmail\.com/i },
            { name: 'Contact phone', pattern: /\+91 78128 91494/ },
        ];

        brandElements.forEach(({ name, pattern }) => {
            if (pattern.test(this.content)) {
                this.passed++;
                log(`  ✓ PASS: ${name} found`, 'green');
            } else {
                this.warnings.push(`Missing brand element: ${name}`);
                log(`  ⚠️  WARNING: ${name} not found`, 'yellow');
            }
        });
    }

    validateFileNaming() {
        log('\n📁 Checking file naming...', 'cyan');

        const fileName = path.basename(this.filePath);
        const validPatterns = [
            /^Invoice_[A-Z0-9-]+\.html$/,
            /^Maintenance_Agreement_[A-Z0-9-]+\.html$/,
            /^Project_SignOff_[A-Z0-9-]+\.html$/,
        ];

        const isValidName = validPatterns.some(pattern => pattern.test(fileName));

        if (isValidName) {
            this.passed++;
            log(`  ✓ PASS: File name follows convention: ${fileName}`, 'green');
        } else {
            this.warnings.push('File name does not follow naming convention');
            log(`  ⚠️  WARNING: File name may not follow convention`, 'yellow');
            log(`      Current: ${fileName}`, 'yellow');
            log('      Expected patterns:', 'yellow');
            log('        - Invoice_<ID>.html', 'yellow');
            log('        - Maintenance_Agreement_<ID>.html', 'yellow');
            log('        - Project_SignOff_<ID>.html', 'yellow');
        }
    }

    validatePrintOptimization() {
        log('\n🖨️  Checking print optimization...', 'cyan');

        const printElements = [
            { name: 'Charset UTF-8', pattern: /<meta charset="UTF-8">/i },
            { name: 'Viewport meta', pattern: /<meta name="viewport"/i },
            { name: 'Page title', pattern: /<title>.*A Generative Slice.*<\/title>/i },
        ];

        printElements.forEach(({ name, pattern }) => {
            if (pattern.test(this.content)) {
                this.passed++;
                log(`  ✓ PASS: ${name} configured`, 'green');
            } else {
                this.warnings.push(`Missing print optimization: ${name}`);
                log(`  ⚠️  WARNING: ${name} not found`, 'yellow');
            }
        });
    }

    generateReport() {
        log('\n' + '='.repeat(60), 'cyan');
        log('📊 VALIDATION REPORT', 'bright');
        log('='.repeat(60), 'cyan');

        log(`\n📄 Document: ${path.basename(this.filePath)}`, 'cyan');
        log(`📍 Path: ${this.filePath}`, 'cyan');

        log('\n📈 Results:', 'bright');
        log(`  ✓ Passed: ${this.passed}`, 'green');
        log(`  ❌ Failed: ${this.failed}`, this.failed > 0 ? 'red' : 'green');
        log(`  ⚠️  Warnings: ${this.warnings.length}`, this.warnings.length > 0 ? 'yellow' : 'green');

        if (this.errors.length > 0) {
            log('\n❌ Errors:', 'red');
            this.errors.forEach(error => log(`  - ${error}`, 'red'));
        }

        if (this.warnings.length > 0) {
            log('\n⚠️  Warnings:', 'yellow');
            this.warnings.forEach(warning => log(`  - ${warning}`, 'yellow'));
        }

        log('\n' + '='.repeat(60), 'cyan');

        if (this.failed === 0) {
            log('✅ VALIDATION PASSED', 'green');
            log('Document follows all brand guidelines.\n', 'green');
            return 0;
        } else {
            log('❌ VALIDATION FAILED', 'red');
            log('Document has errors that must be fixed.\n', 'red');
            return 1;
        }
    }

    validate() {
        log('\n🔍 A Generative Slice - Document Validator\n', 'bright');
        log(`Validating: ${this.filePath}\n`, 'cyan');

        this.loadDocument();
        this.validateCSSReference();
        this.validatePlaceholders();
        this.validateDocumentStructure();
        this.validateBrandElements();
        this.validateFileNaming();
        this.validatePrintOptimization();

        return this.generateReport();
    }
}

function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        log('❌ Error: Missing document path', 'red');
        log('\nUsage:', 'yellow');
        log('  node scripts/validate-document.js <document-path>\n', 'cyan');
        log('Example:', 'yellow');
        log('  node scripts/validate-document.js clients/my-client/generated/Invoice_INV-1001.html\n', 'cyan');
        process.exit(1);
    }

    const documentPath = args[0];
    const validator = new DocumentValidator(documentPath);
    const exitCode = validator.validate();
    process.exit(exitCode);
}

// Run the script
main();
