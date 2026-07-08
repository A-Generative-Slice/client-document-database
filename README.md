# Client Document Database — A Generative Slice

A centralized, professional repository for generating and storing branded business documents (Invoices, Certificates, Agreements) specializing in AI Systems Auditing & Localized Tool Development. Optimized for AI-assisted workflows.

## 🚀 Quick Start for AI Agents
This repository is built for AI assistants (Claude, Antigravity, etc.). 
1.  **Read [CLAUDE.md](./CLAUDE.md)** for the "Source of Truth" on branding, CSS tokens, and file structure.
2.  **Use Templates:** Always use the HTML skeletons in `/templates/`.
3.  **Link CSS:** Ensure all new HTML files `<link>` to `/design-system/brand.css`.

## 🖥️ Document Dashboard
You can now view and manage all your documents through a beautiful, local web interface.
1.  **Run the Dashboard:**
    ```bash
    python core/scripts/serve.py
    ```
2.  **Access:** Open [http://localhost:8000/dashboard.html](http://localhost:8000/dashboard.html) in your browser.
3.  **Features:** Live search, client-specific filtering, and instant document previews.

---

## 📁 Repository Structure
- **`design-system/`**: Contains `brand.css` — the core styling for the entire brand.
- **`templates/`**: Base HTML files with `{{PLACEHOLDER}}` tags.
- **`clients/`**: Organized client data.
  - `<client-name>/generated/`: Pro-designed HTML documents.
  - `<client-name>/signed/`: Final, authenticated legal PDFs (The main source of truth).
- **`CLAUDE.md`**: Master instruction file for AI agents.

---

## 💡 How to Prompt for New Documents
To get perfect, branded results from an AI assistant, use these prompt suggestions:

### 1. For a New Invoice
> "Generate a new invoice for [Client Name] in the `/clients/[client-folder]/generated/` folder. Apply the `/templates/invoice.html` structure and ensure it links to `/design-system/brand.css`. 
> Details: Amount ₹[Amount], Invoice #INV-[Number], Date: [Date], Items: [Description of services]."

### 2. For a Sign-Off Certificate
> "Create a project acceptance certificate for [Project Name]. Use the sign-off template and fill in the deliverables: [List of tasks completed]. Save it to the client's generated folder."

### 3. For a Maintenance Agreement (SLA)
> "Draft a 3-year maintenance agreement for [Client Name]. Use the template in `/templates/maintenance-agreement.html`. Make sure all 12 legal sections are included and the branding matches our orange theme exactly."

### 4. For Consistent Branding
> "Update the [Document Name] for [Client]. Ensure the header gradient and logo typography strictly follow the rules in `CLAUDE.md` and use the CSS variables from `brand.css`."

---

## 🎨 Branding Source of Truth
- **Tagline:** AI Systems Auditing & Localized Tool Development
- **Primary Orange:** `#FF8C1A`
- **Dark Orange:** `#D97008`
- **Text Gray:** `#2C3E50`
- **Font:** Inter / Roboto

## 🔧 Maintenance
- **Updating Styles:** Edit `/design-system/brand.css` to update the look of ALL future documents simultaneously.
- **New Templates:** Add new `.html` files to `/templates/` following the same structure.

---
Created & Maintained by **A Generative Slice** (Mohammed Hussain)
