# Clients Directory

This directory contains all client-specific documents and data files.

## 📁 Structure

```
clients/
├── _template/              # Template for new client folders
├── nas-design-construction/ # Existing client (example)
└── [your-client-name]/     # Add new clients here
```

## 🆕 Adding a New Client

### Quick Setup

```bash
# Copy the template
cp -r clients/_template clients/new-client-name

# Create a README for the client
vim clients/new-client-name/README.md
```

### Step-by-Step

1. **Create client folder structure:**
   ```bash
   mkdir -p clients/new-client-name/{data,generated,signed}
   ```

2. **Prepare data files** in `data/` directory

3. **Generate documents** using the scripts:
   ```bash
   node scripts/generate-document.js invoice new-client-name data-file.json
   ```

4. **Validate and export** to PDF

5. **Store signed PDFs** in `signed/` directory

## 📋 Current Clients

### NAS Design & Construction
- **Status**: Active
- **Website**: nasdesignconstruction.com
- **Documents**:
  - Invoice: INV-1001
  - Maintenance Agreement: SLA-2026-001
  - Sign-Off Certificate: CERT-2026-001

### Light Lab (Litelab Design Consultants LLP)
- **Status**: Active
- **Services**: AI Systems Auditing & Localized Tool Development
- **Representative**: Bazur
- **Email**: Commercials@litelab.in
- **Documents**:
  - Invoice: INV-JUL26-LightLab
  - Mutual Non-Disclosure Agreement: NDA-LightLab
  - Service Level & Retainer Agreement: SLA-LightLab

## 🗂️ Folder Organization

Each client folder should contain:

### `/data/`
JSON files with placeholder values for document generation
- Example: `invoice-project-2026-04.json`
- Keep for historical reference
- Can regenerate documents from these

### `/generated/`
HTML documents generated from templates
- Example: `Invoice_INV-1001.html`
- Working files
- Version controlled in Git

### `/signed/`
Final signed PDF documents
- Example: `Invoice_INV-1001_SIGNED.pdf`
- **Legal source of truth**
- Must be backed up
- Not regenerated without approval

## 🔍 Finding Client Documents

### By Client Name
```bash
ls clients/client-name/signed/
```

### By Document Type
```bash
find clients -name "Invoice_*.pdf"
find clients -name "Maintenance_Agreement_*.pdf"
find clients -name "Project_SignOff_*.pdf"
```

### By Date
```bash
find clients -name "*.pdf" -newermt "2026-04-01"
```

## 📊 Client Management Tips

1. **Consistent naming** - Use lowercase-with-hyphens for folder names
2. **Document metadata** - Keep a README.md in each client folder
3. **Regular backups** - Especially for signed PDFs
4. **Archive old projects** - Move to `clients/_archive/` when done
5. **Track versions** - Note template versions used in client README

## 🔒 Security Notes

- Signed PDFs contain sensitive financial and legal information
- Add `.env` files to `.gitignore` if storing credentials
- Consider encryption for backups of signed documents
- Limit access to this directory in production environments

## 📈 Scaling Recommendations

As your client base grows:

1. **Archive old clients**: 
   ```bash
   mkdir -p clients/_archive
   mv clients/old-client clients/_archive/
   ```

2. **Group by year**:
   ```
   clients/
   ├── 2026/
   │   ├── client-a/
   │   └── client-b/
   └── 2027/
       └── client-c/
   ```

3. **Use a database** for metadata (client contacts, project info)

4. **Implement search tools** for finding documents quickly

## 🛠️ Automation

Generate reports and statistics:

```bash
# Count total clients
ls -d clients/*/ | grep -v "_template" | wc -l

# List all signed documents
find clients -name "*_SIGNED.pdf" -type f

# Find clients without signed documents
for dir in clients/*/; do
  if [ ! -d "$dir/signed" ] || [ -z "$(ls -A $dir/signed)" ]; then
    echo "No signed docs: $dir"
  fi
done
```

## 📞 Support

For questions about client document management:
- Email: agenerativeslice@gmail.com
- Phone: +91 78128 91494
