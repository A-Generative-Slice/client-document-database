# Quick Reference Guide

## 🚀 Common Tasks

### Generate a New Invoice
```bash
# 1. Create data file
vim clients/client-name/data/invoice-apr-2026.json

# 2. Generate
node scripts/generate-document.js invoice client-name clients/client-name/data/invoice-apr-2026.json

# 3. Validate
node scripts/validate-document.js clients/client-name/generated/Invoice_INV-XXXX.html
```

### Add a New Client
```bash
# Copy template
cp -r clients/_template clients/new-client-name

# Add client info
vim clients/new-client-name/README.md
```

### Validate an Existing Document
```bash
node scripts/validate-document.js clients/nas-design-construction/generated/Invoice_INV-1001.html
```

## 📁 File Locations

| What | Where |
|------|-------|
| Templates | `templates/*.html` |
| Brand CSS | `design-system/brand.css` |
| Scripts | `scripts/*.js` |
| Client folders | `clients/[client-name]/` |
| Generated docs | `clients/[client-name]/generated/` |
| Signed PDFs | `clients/[client-name]/signed/` |

## 🎨 Brand Colors

```css
--brand-primary: #FF8C1A;           /* Vibrant Orange */
--brand-primary-dark: #D97008;      /* Darker Orange */
--text-primary: #2C3E50;            /* Dark Gray */
```

## 📝 Placeholder Format

All placeholders use uppercase with underscores:
```html
{{INVOICE_NUMBER}}
{{CLIENT_NAME}}
{{TOTAL}}
```

## 🔍 Common Commands

### Find all client documents
```bash
find clients -name "*.pdf"
```

### Count clients
```bash
ls -d clients/*/ | grep -v "_template" | wc -l
```

### List all invoices
```bash
find clients -name "Invoice_*.html"
```

### Backup signed documents
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz clients/*/signed/
```

## ⚡ Keyboard Shortcuts

When working with generated HTML in browser:
- **Ctrl+P** / **Cmd+P** - Print to PDF
- **F12** - Open developer tools
- **Ctrl+Shift+R** - Hard refresh (reload CSS)

## 🐛 Troubleshooting

### Script not found
```bash
# Make sure you're in the repo root
cd /path/to/client-document-database
pwd  # Should show client-document-database
```

### Missing placeholders
Check the data JSON file has all required fields.
See `scripts/README.md` for complete field lists.

### CSS not loading
Check the relative path in the HTML:
```html
<link rel="stylesheet" href="../../../design-system/brand.css">
```

### Validation fails
Run with verbose output to see details:
```bash
node scripts/validate-document.js path/to/file.html
```

## 📞 Support

- **Email**: agenerativeslice@gmail.com
- **Phone**: +91 78128 91494
- **Documentation**: See README.md in each directory

## 🔗 Quick Links

- [Main README](README.md)
- [Scripts Guide](scripts/README.md)
- [Client Management](clients/README.md)
- [Template Versioning](templates/VERSION_HISTORY.md)
- [AI Instructions](CLAUDE.md)
- [Changelog](CHANGELOG.md)
