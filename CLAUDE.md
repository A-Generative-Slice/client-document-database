# A GENERATIVE SLICE - Document Generation Rules

This file provides instructions for any AI coding assistant (Claude Code, Antigravity, etc.) to generate consistent, branded business documents for "A Generative Slice".

## 🎨 BRAND IDENTITY (Single Source of Truth)
- **Primary Color:** `#FF8C1A` (Vibrant Orange)
- **Secondary Color:** `#D97008` (Darker Orange - for accents and hover states)
- **Text Color:** `#2C3E50` (Professional Dark Gray)
- **Styling:** ALWAYS link to `/design-system/brand.css`. NEVER embed CSS inline unless strictly necessary for PDF quirks.

## 📁 REPOSITORY STRUCTURE
- `/design-system/brand.css`: The CSS definition for all components.
- `/templates/`: Reusable HTML skeletons (use these for all new documents).
- `/clients/<client-name>/generated/`: Where new document HTMLs go.
- `/clients/<client-name>/signed/`: Where the final, authentic, legal PDFs go.

## 🛠️ DOCUMENT GENERATION PROCESS
When asked to generate a document (Invoice, Certificate, Agreement):
1.  **Reference the Template:** Open the corresponding file in `/templates/`.
2.  **Fill Placeholders:** Use the information from the prompt to fill `{{PLACEHOLDERS}}`.
3.  **Client Folder:** Create a folder in `/clients/` if it doesn't exist.
4.  **Save HTML:** Save the filled template as a new HTML file in `/clients/<client-name>/generated/`.
5.  **Maintain Consistency:** Ensure the header gradient, logo text, typography, and signature blocks match existing documents exactly.

## 📝 STYLE GUIDELINES
- High-end, premium, architectural aesthetic.
- Clean typography (Inter/Roboto).
- Print-optimized: A4 size, 40px padding, `print-color-adjust: exact`.
- Consistent headers with translucent circular decorative elements (via CSS pseudo-elements).

## 🏦 BUSINESS INFORMATION (for Invoices)
- **Bank:** State Bank of India
- **Account Name:** Mohammed Hussain S
- **Account Number:** 39575910574
- **IFSC:** SBIN0005201
- **Email:** agenerativeslice@gmail.com
- **Phone:** +91 78128 91494
