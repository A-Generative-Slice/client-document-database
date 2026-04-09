#!/bin/bash

# ============================================================
# A GENERATIVE SLICE - GitHub Push Helper
# ============================================================
# This script finishes the job by pushing the restructured 
# repository to the organization repo.
# ============================================================

# Use the token you provided (revoking it after use is recommended)
TOKEN="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"
REPO="github.com/A-Generative-Slice/client-document-database.git"

echo "🚀 Starting push to A-Generative-Slice organization..."

# Set the authenticated remote URL
git remote set-url origin "https://A-Generative-Slice:${TOKEN}@${REPO}"

# Push to main
echo "📦 Pushing main branch..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS! Your Client Document Database is now live."
    echo "🔗 Repo: https://github.com/A-Generative-Slice/client-document-database"
else
    echo "❌ ERROR: Push failed. Check your internet connection or if the repo exists."
fi
