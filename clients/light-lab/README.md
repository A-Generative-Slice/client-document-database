# Client Document Directory

This directory is set up for managing documents related to this client folder.

## 🤖 Agent Instructions for Directory Setup

To manage, generate, and store documents in this directory using an AI agent:

1. **Directory Structure**:
   Ensure the following directories are present:
   - `generated/`: Place generated HTML working documents here.
   - `signed/`: Place final signed PDFs here.

2. **Storing Signed Documents**:
   - Move signed PDFs downloaded from client communications to the `signed/` folder.
   - Use the naming standard: `<Document_Name>_SIGNED.pdf` (e.g., `NDA-LightLab_SIGNED.pdf`, `SLA-LightLab_SIGNED.pdf`).

3. **Updating the Index**:
   - Run the dashboard sync script to update index files:
     ```bash
     python core/scripts/update_dashboard.py
     ```
