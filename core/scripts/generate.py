import os
import sys
import json
from datetime import datetime

def generate_document(template_name, data_file, client_name):
    """
    Generates a document by replacing placeholders in an HTML template.
    Usage: python generate.py <template> <json_data> <client_name>
    """
    
    # Path setup
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    template_path = os.path.join(base_dir, 'templates', f"{template_name}.html")
    client_dir = os.path.join(base_dir, 'clients', client_name.lower().replace(' ', '-'), 'generated')
    
    if not os.path.exists(template_path):
        print(f"❌ Error: Template '{template_name}' not found at {template_path}")
        return

    # Create client dir if not exists
    os.makedirs(client_dir, exist_ok=True)

    # Load data
    try:
        with open(data_file, 'r') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Error loading data file: {e}")
        return

    # Read template
    with open(template_path, 'r') as f:
        content = f.read()

    # Automatic placeholders
    data.setdefault('SIGNING_DATE', datetime.now().strftime('%B %d, %Y'))
    data.setdefault('AGREEMENT_DATE', datetime.now().strftime('%B %d, %Y'))
    
    # Replace placeholders
    for key, value in data.items():
        placeholder = f"{{{{{key}}}}}"
        content = content.replace(placeholder, str(value))

    # Output filename
    prefix = template_name.replace('-', '_').title()
    ref = data.get('AGREEMENT_REFERENCE', data.get('INVOICE_NUMBER', 'DOC'))
    output_filename = f"{prefix}_{ref}.html"
    output_path = os.path.join(client_dir, output_filename)

    with open(output_path, 'w') as f:
        f.write(content)

    print(f"✅ Success! Generated: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python generate.py <template_basename> <data_json_path> <client_folder_name>")
        print("Example: python generate.py maintenance-agreement data.json nas-design")
    else:
        generate_document(sys.argv[1], sys.argv[2], sys.argv[3])
