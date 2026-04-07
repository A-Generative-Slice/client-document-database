# Document Generation Scripts

This directory contains automation scripts for the Client Document Database.

## 📄 Available Scripts

### 1. `generate-document.js`
Generates documents from templates by replacing placeholders with actual data.

**Usage:**
```bash
node scripts/generate-document.js <template-type> <client-name> <data-file>
```

**Available Template Types:**
- `invoice` - Invoice document
- `maintenance-agreement` - Maintenance & Management Agreement
- `signoff-certificate` - Project Sign-Off Certificate

**Example:**
```bash
node scripts/generate-document.js invoice my-client scripts/examples/sample-invoice-data.json
```

### 2. `validate-document.js`
Validates generated documents to ensure they follow brand guidelines.

**Usage:**
```bash
node scripts/validate-document.js <document-path>
```

**Example:**
```bash
node scripts/validate-document.js clients/my-client/generated/Invoice_INV-1001.html
```

## 📊 Data File Format

Data files should be in JSON format with placeholder names as keys:

```json
{
  "INVOICE_NUMBER": "INV-1001",
  "INVOICE_DATE": "April 7, 2026",
  "CLIENT_NAME": "Example Company",
  "TOTAL": "10,000.00"
}
```

### Required Fields by Template

**Invoice Template:**
- INVOICE_NUMBER
- INVOICE_DATE
- PAYMENT_TERMS
- DUE_DATE
- CLIENT_NAME
- CLIENT_CONTACT
- CLIENT_ADDRESS_LINE1
- CLIENT_ADDRESS_LINE2
- CLIENT_EMAIL
- CLIENT_PHONE
- ITEM_1_TITLE, ITEM_1_DESCRIPTION, ITEM_1_AMOUNT
- SUBTOTAL, TAX, TOTAL
- ADDITIONAL_TERM

**Maintenance Agreement Template:**
- AGREEMENT_DATE
- AGREEMENT_REFERENCE
- CLIENT_NAME
- CLIENT_CONTACT
- CLIENT_ADDRESS_LINE1
- CLIENT_ADDRESS_LINE2
- CLIENT_EMAIL
- CLIENT_PHONE
- CLIENT_WEBSITE
- TERM_DURATION
- TERM_DESCRIPTION
- EFFECTIVE_DATE
- EXPIRATION_DATE
- MONTHLY_UPDATES
- TURNAROUND_TIME
- UPTIME_SLA
- CRITICAL_RESPONSE_TIME
- NONCRITICAL_RESPONSE_TIME
- YEAR_1_FEE, YEAR_1_TERMS
- YEAR_2_FEE, YEAR_2_TERMS
- YEAR_3_FEE, YEAR_3_TERMS
- SIGNING_DATE
- CLIENT_SIGNATORY

**Sign-Off Certificate Template:**
- PROJECT_NAME
- PROJECT_URL
- CERT_DATE
- CERT_REFERENCE
- CLIENT_NAME
- DELIVERABLE_1 through DELIVERABLE_6
- EFFECTIVE_DATE
- SIGNING_DATE
- CLIENT_SIGNATORY

## 🔄 Workflow

1. **Prepare Data**: Create a JSON file with all required placeholder values
2. **Generate Document**: Run the generate script with your data
3. **Validate**: Run the validation script to check for issues
4. **Review**: Open the generated HTML in a browser
5. **Export to PDF**: Print to PDF or use a tool to create the signed version
6. **Store**: Move the signed PDF to the `signed/` directory

## 📝 Example Workflow

```bash
# 1. Create your data file
vim my-invoice-data.json

# 2. Generate the document
node scripts/generate-document.js invoice acme-corp my-invoice-data.json

# 3. Validate the document
node scripts/validate-document.js clients/acme-corp/generated/Invoice_INV-1001.html

# 4. Open in browser to review
# (Use your browser to open the file)

# 5. Print to PDF for signing
# (Use browser print function: Ctrl+P / Cmd+P)

# 6. Move signed PDF to signed/ directory
mv ~/Downloads/Invoice_INV-1001_SIGNED.pdf clients/acme-corp/signed/
```

## 🛠️ Requirements

- Node.js (v14 or higher)
- No external dependencies required - uses only Node.js built-in modules

## 💡 Tips

- Use the example data files in `scripts/examples/` as starting points
- Keep data files organized by client in their respective directories
- Always validate documents before final export
- Use descriptive file names for data files (e.g., `invoice-project-name-2026.json`)
