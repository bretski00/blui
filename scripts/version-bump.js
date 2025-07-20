#!/usr/bin/env node

/**
 * Version Bump Script
 * 
 * This script handles version bumping and automatically generates changelogs:
 * 1. Updates package.json version
 * 2. Generates changelog for the new version
 * 3. Creates git tag
 * 4. Commits changes
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const PACKAGE_JSON = join(ROOT_DIR, 'package.json');

/**
 * Parse version string into components
 */
function parseVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major, minor, patch };
}

/**
 * Increment version based on type
 */
function incrementVersion(currentVersion, type) {
  const { major, minor, patch } = parseVersion(currentVersion);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      throw new Error(`Invalid version type: ${type}. Use major, minor, or patch.`);
  }
}

/**
 * Update package.json version
 */
function updatePackageVersion(newVersion) {
  const packageJson = JSON.parse(readFileSync(PACKAGE_JSON, 'utf-8'));
  const oldVersion = packageJson.version;
  
  packageJson.version = newVersion;
  writeFileSync(PACKAGE_JSON, JSON.stringify(packageJson, null, 2) + '\n');
  
  return oldVersion;
}

/**
 * Create git tag for version
 */
function createGitTag(version) {
  try {
    execSync(`git tag -a v${version} -m "Release v${version}"`, { 
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
    console.log(`✅ Created git tag: v${version}`);
  } catch (error) {
    console.warn(`⚠️  Could not create git tag: ${error.message}`);
  }
}

/**
 * Commit changes
 */
function commitChanges(version) {
  try {
    execSync('git add .', { cwd: ROOT_DIR });
    execSync(`git commit -m "chore: release v${version}

- Update package.json version to ${version}
- Generate changelog for v${version}
- Update documentation"`, { 
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
    console.log(`✅ Committed changes for v${version}`);
  } catch (error) {
    console.warn(`⚠️  Could not commit changes: ${error.message}`);
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`Usage: npm run version <major|minor|patch|x.y.z>

Examples:
  npm run version patch    # 1.0.0 -> 1.0.1
  npm run version minor    # 1.0.0 -> 1.1.0  
  npm run version major    # 1.0.0 -> 2.0.0
  npm run version 1.2.3    # Set specific version
`);
    process.exit(1);
  }

  const versionArg = args[0];
  
  // Read current version
  const packageJson = JSON.parse(readFileSync(PACKAGE_JSON, 'utf-8'));
  const currentVersion = packageJson.version;
  
  console.log(`📦 Current version: ${currentVersion}`);
  
  // Calculate new version
  let newVersion;
  if (['major', 'minor', 'patch'].includes(versionArg)) {
    newVersion = incrementVersion(currentVersion, versionArg);
  } else if (/^\d+\.\d+\.\d+$/.test(versionArg)) {
    newVersion = versionArg;
  } else {
    console.error(`❌ Invalid version argument: ${versionArg}`);
    process.exit(1);
  }
  
  console.log(`📦 New version: ${newVersion}`);
  
  // Update package.json
  console.log('📝 Updating package.json...');
  updatePackageVersion(newVersion);
  
  // Generate documentation (includes changelog)
  console.log('📚 Generating documentation...');
  try {
    execSync('node scripts/generate-docs.js', { 
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
  } catch (error) {
    console.warn(`⚠️  Could not generate docs: ${error.message}`);
  }
  
  // Generate changelog
  console.log('📝 Generating changelog...');
  try {
    execSync(`node scripts/generate-changelog.js --version ${newVersion}`, { 
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
  } catch (error) {
    console.warn(`⚠️  Could not generate changelog: ${error.message}`);
  }
  
  // Create git tag
  createGitTag(newVersion);
  
  // Commit changes
  commitChanges(newVersion);
  
  console.log(`🎉 Successfully bumped version from ${currentVersion} to ${newVersion}!`);
  console.log(`
Next steps:
  git push origin main
  git push origin v${newVersion}
  npm publish
`);
}

main();
