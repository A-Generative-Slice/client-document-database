#!/bin/bash

# ============================================================
# A GENERATIVE SLICE - GitHub Push Helper (SECURE VERSION)
# ============================================================

# Load environment variables if .env exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

TOKEN=${GITHUB_TOKEN}
REPO=${REPO_NAME:-"A-Generative-Slice/client-document-database"}
USER=${GITHUB_USERNAME:-"A-Generative-Slice"}

if [ -z "$TOKEN" ]; then
    echo "❌ ERROR: GITHUB_TOKEN not found."
    echo "Please create a .env file with GITHUB_TOKEN=your_token"
    exit 1
fi

echo "🚀 Starting secure push to organization..."

# Set the authenticated remote URL
git remote set-url origin "https://${USER}:${TOKEN}@github.com/${REPO}.git"

# Push to main
echo "📦 Pushing main branch..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ SUCCESS! Repository is synced."
else
    echo "❌ ERROR: Push failed."
fi
