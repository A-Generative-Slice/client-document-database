import os
import json
import re
from datetime import datetime

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CLIENTS_DIR = os.path.join(BASE_DIR, 'clients')
DASHBOARD_FILE = os.path.join(BASE_DIR, 'dashboard.html')
INDEX_FILE = os.path.join(BASE_DIR, 'index.html')

def extract_metadata(html_path):
    """Simple regex based extraction of Title and ID from generated HTML"""
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Look for Title in <title> tags
        title_match = re.search(r'<title>(.*?)</title>', content)
        title = title_match.group(1) if title_match else os.path.basename(html_path)
        
        # Look for Doc ID/Number in meta-value spans (common pattern in our templates)
        id_match = re.search(r'<span class="meta-value">(.*?)</span>', content)
        doc_id = id_match.group(1) if id_match else "N/A"
        
        # Stats
        mtime = os.path.getmtime(html_path)
        date_str = datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M')
        
        return {
            "title": title.split(' - ')[0], # Remove brand suffix if present
            "id": doc_id,
            "date": date_str,
            "path": os.path.relpath(html_path, BASE_DIR),
            "filename": os.path.basename(html_path)
        }
    except Exception as e:
        print(f"⚠️ Warning: Could not extract metadata from {html_path}: {e}")
        return None

def get_document_data():
    clients_data = {}
    
    if not os.path.exists(CLIENTS_DIR):
        return clients_data

    for client_name in os.listdir(CLIENTS_DIR):
        client_path = os.path.join(CLIENTS_DIR, client_name)
        if not os.path.isdir(client_path) or client_name.startswith('_'):
            continue
            
        gen_dir = os.path.join(client_path, 'generated')
        if not os.path.exists(gen_dir):
            continue
            
        docs = []
        for file in os.listdir(gen_dir):
            if file.endswith('.html'):
                meta = extract_metadata(os.path.join(gen_dir, file))
                if meta:
                    docs.append(meta)
        
        if docs:
            clients_data[client_name] = {
                "name": client_name.replace('-', ' ').title(),
                "documents": sorted(docs, key=lambda x: x['date'], reverse=True)
            }
            
    return clients_data

def update_dashboard():
    print("🔍 Scanning for client documents...")
    data = get_document_data()
    json_data = json.dumps(data, indent=2)
    
    if not os.path.exists(DASHBOARD_FILE):
        print("❌ Error: dashboard.html not found. Please run the dashboard creation first.")
        return

    with open(DASHBOARD_FILE, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the data injection marker
    marker_start = "/* DATA_START */"
    marker_end = "/* DATA_END */"
    
    if marker_start in html and marker_end in html:
        new_html = re.sub(
            f"{re.escape(marker_start)}.*?{re.escape(marker_end)}", 
            f"{marker_start}const DOC_DATA = {json_data};{marker_end}", 
            html, 
            flags=re.DOTALL
        )
        with open(DASHBOARD_FILE, 'w', encoding='utf-8') as f:
            f.write(new_html)
        with open(INDEX_FILE, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f"✅ Dashboard and Index updated with {sum(len(c['documents']) for c in data.values())} documents across {len(data)} clients.")
    else:
        print("❌ Error: Could not find injection markers in dashboard.html")

if __name__ == "__main__":
    update_dashboard()
