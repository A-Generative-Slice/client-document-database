import os
import subprocess
import sys
import webbrowser
import http.server
import socketserver
from threading import Timer

# Configuration
PORT = 8000
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPDATER_SCRIPT = os.path.join(BASE_DIR, 'core', 'scripts', 'update_dashboard.py')

def run_update():
    print("🔄 Syncing document index...")
    try:
        subprocess.run([sys.executable, UPDATER_SCRIPT], check=True)
    except Exception as e:
        print(f"❌ Error updating dashboard: {e}")

def open_browser():
    webbrowser.open(f"http://localhost:{PORT}/dashboard.html")

def serve():
    os.chdir(BASE_DIR)
    
    # Update first
    run_update()
    
    # Start server
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Dashboard Server running at http://localhost:{PORT}")
        print("📁 Serving from project root.")
        print("Press Ctrl+C to stop.")
        
        # Open browser after a short delay
        Timer(1.5, open_browser).start()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    serve()
