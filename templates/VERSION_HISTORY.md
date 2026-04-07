# Template Versioning System

This directory contains versioned templates for document generation.

## 📋 Version History

### Current Version: v1.0.0 (2026-04-07)

#### Templates
- `invoice.html` - v1.0.0
- `maintenance-agreement.html` - v1.0.0
- `signoff-certificate.html` - v1.0.0
- `brand.css` - v1.0.0

## 📝 Changelog

### v1.0.0 (2026-04-07)
**Initial Release**
- Initial template structure
- Brand CSS design system
- Invoice, Maintenance Agreement, and Sign-Off Certificate templates
- Orange brand color scheme (#FF8C1A)
- Print-optimized A4 layout

## 🔄 Versioning Guidelines

### When to Create a New Version

Create a new template version when:
1. **Breaking Changes**: Changes that make existing data files incompatible
   - Renaming placeholders
   - Removing required fields
   - Changing template structure significantly

2. **Major Features**: Adding significant new sections or capabilities
   - New document sections
   - Additional data fields
   - Layout restructuring

3. **Brand Updates**: Visual identity changes
   - Color scheme changes
   - Typography updates
   - Logo modifications

### Version Numbering

We follow Semantic Versioning (SemVer):
- **Major** (X.0.0): Breaking changes, incompatible with previous versions
- **Minor** (1.X.0): New features, backwards compatible
- **Patch** (1.0.X): Bug fixes, minor improvements

### How to Create a New Version

1. **Copy the current template directory:**
   ```bash
   cp -r templates templates-v1.0.0
   ```

2. **Update the version in templates/VERSION:**
   ```bash
   echo "1.1.0" > templates/VERSION
   ```

3. **Make your changes to templates/**

4. **Document changes in this CHANGELOG.md**

5. **Update CLAUDE.md if needed**

6. **Tag the commit:**
   ```bash
   git add .
   git commit -m "Release v1.1.0: Description of changes"
   git tag -a v1.1.0 -m "Version 1.1.0"
   ```

## 🗂️ Version Archive Structure

Archived versions are stored in the root directory:
```
templates-v1.0.0/
templates-v1.1.0/
templates/         (current version)
```

## 📦 Using Specific Versions

To generate a document with a specific template version:

```bash
# Use current version (default)
node scripts/generate-document.js invoice my-client data.json

# Use specific version
node scripts/generate-document.js invoice my-client data.json --template-version v1.0.0
```

## 🔍 Version Compatibility

| Template Version | Brand CSS Version | Min. Generator Version |
|-----------------|-------------------|------------------------|
| v1.0.0          | v1.0.0           | v1.0.0                |

## 📚 Migration Guides

### Migrating from v1.0.0 to v1.1.0
(To be added when v1.1.0 is released)

## 🛡️ Stability Guarantees

- **Current templates/**: Latest version, may receive updates
- **Archived templates-vX.X.X/**: Frozen, guaranteed unchanged
- **Generated documents**: Reference specific CSS version via path

## 💡 Best Practices

1. **Always document breaking changes** in this CHANGELOG
2. **Test new versions** with existing data files
3. **Keep old versions** for at least 1 year
4. **Inform clients** before upgrading their documents to new versions
5. **Use semantic version numbers** consistently
