# Client Document Database — A Generative Slice

A centralized repository for professional, branded business documents including Invoices, Project Sign-Off Certificates, and Maintenance Agreements.

## 🚀 Quick Start for AI Agents
This repository is optimized for AI coding assistants. On cloning, please refer to [CLAUDE.md](./CLAUDE.md) for branding rules and document generation instructions.

## 📁 Repository Structure
- **`design-system/`**: Global CSS (`brand.css`) that defines the visual identity. All documents must reference this.
- **`templates/`**: HTML templates for consistent generation.
- **`clients/`**: Organized by client.
  - `<client-name>/generated/`: Branded HTML documents ready for printing/PDF conversion.
  - `<client-name>/signed/`: The primary source of truth — final, authenticated, signed legal PDFs.

## 🎨 Visual Identity
- **Primary:** Vibrant Orange (`#FF8C1A`)
- **Accent:** Dark Orange (`#D97008`)
- **Text:** Dark Gray (`#2C3E50`)
- **Design:** Modern, clean, professional, architectural.

## 🛠️ How to Generate a New Document

### Automated Generation (Recommended)
```bash
# 1. Create a data file with your values
vim clients/my-client/data/invoice-data.json

# 2. Generate the document
node scripts/generate-document.js invoice my-client clients/my-client/data/invoice-data.json

# 3. Validate the document
node scripts/validate-document.js clients/my-client/generated/Invoice_INV-XXXX.html

# 4. Open in browser, print to PDF, and get signed
```

### Manual Generation (AI Assistant)
Ask your AI assistant:
> "Generate a new invoice for [Client Name] for [Project Name] with amount ₹[Amount]. Use the invoice template and the brand.css style."

## 🚀 New Features

### ✅ Automation Scripts
- **Document Generator**: Automatically create documents from templates and data files
- **Document Validator**: Verify documents follow brand guidelines
- See `scripts/README.md` for detailed usage

### ✅ Template Versioning
- Version tracking for templates and design system
- Changelog for tracking updates
- See `templates/VERSION_HISTORY.md` for details

### ✅ Client Management
- Template structure for new clients in `clients/_template/`
- Documentation and best practices
- See `clients/README.md` for client management guide

## 📚 Documentation

- **[Scripts Guide](scripts/README.md)** - Automation tools and workflow
- **[Template Versioning](templates/VERSION_HISTORY.md)** - Version history and migration guides
- **[Client Management](clients/README.md)** - Managing client folders and documents
- **[AI Instructions](CLAUDE.md)** - Guidelines for AI assistants

## 🔧 Requirements

- **Node.js** v14+ (for automation scripts)
- Modern web browser (for viewing/printing documents)
- Git (for version control)

## ⚡ Quick Start

1. **Clone the repository**
2. **Create a new client:**
   ```bash
   cp -r clients/_template clients/new-client
   ```
3. **Prepare data file:**
   ```bash
   vim clients/new-client/data/invoice.json
   ```
4. **Generate document:**
   ```bash
   node scripts/generate-document.js invoice new-client clients/new-client/data/invoice.json
   ```
5. **Validate and export to PDF**

---
Created & Maintained by **A Generative Slice** (Mohammed Hussain)
