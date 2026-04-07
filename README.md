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
Ask your AI assistant:
> "Generate a new invoice for [Client Name] for [Project Name] with amount ₹[Amount]. Use the invoice template and the brand.css style."

---
Created & Maintained by **A Generative Slice** (Mohammed Hussain)
