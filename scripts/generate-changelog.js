#!/usr/bin/env node

/**
 * Changelog Generation Script
 * 
 * This script automatically generates changelogs by:
 * 1. Detecting version changes in package.json
 * 2. Analyzing git commits since the last version
 * 3. Categorizing changes (features, fixes, breaking changes)
 * 4. Generating version-specific changelog files
 * 5. Updating the main CHANGELOG.md
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const CHANGELOG_DIR = join(ROOT_DIR, 'changelogs');
const PACKAGE_JSON = join(ROOT_DIR, 'package.json');
const MAIN_CHANGELOG = join(ROOT_DIR, 'CHANGELOG.md');

// Ensure changelogs directory exists
if (!existsSync(CHANGELOG_DIR)) {
  mkdirSync(CHANGELOG_DIR, { recursive: true });
}

/**
 * Get the current version from package.json
 */
function getCurrentVersion() {
  const packageJson = JSON.parse(readFileSync(PACKAGE_JSON, 'utf-8'));
  return packageJson.version;
}

/**
 * Get the previous version tag from git
 */
function getPreviousVersion() {
  try {
    const tags = execSync('git tag --sort=-version:refname', { 
      encoding: 'utf-8',
      cwd: ROOT_DIR 
    }).trim().split('\n').filter(Boolean);
    
    return tags.length > 0 ? tags[0] : null;
  } catch (error) {
    return null;
  }
}

/**
 * Get git commits since the last version
 */
function getCommitsSinceLastVersion(lastVersion) {
  try {
    const range = lastVersion ? `${lastVersion}..HEAD` : 'HEAD';
    const commits = execSync(`git log ${range} --pretty=format:"%h|%s|%b|%an|%ad" --date=short`, {
      encoding: 'utf-8',
      cwd: ROOT_DIR
    }).trim();

    if (!commits) return [];

    return commits.split('\n').map(line => {
      const [hash, subject, body, author, date] = line.split('|');
      return { hash, subject, body, author, date };
    });
  } catch (error) {
    console.warn('Could not get git commits:', error.message);
    return [];
  }
}

/**
 * Categorize commits based on conventional commit patterns
 */
function categorizeCommits(commits) {
  const categories = {
    breaking: [],
    features: [],
    fixes: [],
    docs: [],
    styles: [],
    refactor: [],
    perf: [],
    tests: [],
    chore: [],
    other: []
  };

  commits.forEach(commit => {
    const { subject, body } = commit;
    const fullMessage = `${subject}\n${body}`.toLowerCase();
    
    // Check for breaking changes
    if (fullMessage.includes('breaking change') || 
        fullMessage.includes('breaking:') ||
        subject.includes('!:')) {
      categories.breaking.push(commit);
    }
    // Categorize by conventional commit type
    else if (subject.match(/^feat(\(.+\))?:/)) {
      categories.features.push(commit);
    }
    else if (subject.match(/^fix(\(.+\))?:/)) {
      categories.fixes.push(commit);
    }
    else if (subject.match(/^docs?(\(.+\))?:/)) {
      categories.docs.push(commit);
    }
    else if (subject.match(/^style(\(.+\))?:/)) {
      categories.styles.push(commit);
    }
    else if (subject.match(/^refactor(\(.+\))?:/)) {
      categories.refactor.push(commit);
    }
    else if (subject.match(/^perf(\(.+\))?:/)) {
      categories.perf.push(commit);
    }
    else if (subject.match(/^test(\(.+\))?:/)) {
      categories.tests.push(commit);
    }
    else if (subject.match(/^chore(\(.+\))?:/)) {
      categories.chore.push(commit);
    }
    else {
      categories.other.push(commit);
    }
  });

  return categories;
}

/**
 * Format a commit for display in changelog
 */
function formatCommit(commit, includeHash = true) {
  const { hash, subject, author } = commit;
  
  // Clean up the subject line
  let cleanSubject = subject
    .replace(/^(feat|fix|docs?|style|refactor|perf|test|chore)(\(.+\))?:\s*/, '')
    .replace(/^[A-Z]/, char => char.toLowerCase());
  
  // Capitalize first letter
  cleanSubject = cleanSubject.charAt(0).toUpperCase() + cleanSubject.slice(1);
  
  // Remove trailing periods
  cleanSubject = cleanSubject.replace(/\.$/, '');
  
  const hashPart = includeHash ? ` ([${hash}](../../commit/${hash}))` : '';
  const authorPart = author ? ` by @${author}` : '';
  
  return `- ${cleanSubject}${hashPart}${authorPart}`;
}

/**
 * Generate version-specific changelog content
 */
function generateVersionChangelog(version, commits, previousVersion) {
  const categories = categorizeCommits(commits);
  const date = new Date().toISOString().split('T')[0];
  
  let changelog = `# Changelog for v${version}

*Released on ${date}*

`;

  if (previousVersion) {
    changelog += `> **Comparison**: [v${previousVersion}...v${version}](../../compare/v${previousVersion}...v${version})

`;
  }

  // Add summary
  const totalChanges = Object.values(categories).flat().length;
  if (totalChanges === 0) {
    changelog += `## Summary

No significant changes in this release.

`;
  } else {
    changelog += `## Summary

This release includes ${totalChanges} change${totalChanges === 1 ? '' : 's'} across the following categories:

`;
    
    Object.entries(categories).forEach(([category, commits]) => {
      if (commits.length > 0) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        changelog += `- **${categoryName}**: ${commits.length} change${commits.length === 1 ? '' : 's'}\n`;
      }
    });
    
    changelog += '\n';
  }

  // Breaking Changes (most important)
  if (categories.breaking.length > 0) {
    changelog += `## ⚠️ Breaking Changes

${categories.breaking.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // New Features
  if (categories.features.length > 0) {
    changelog += `## ✨ New Features

${categories.features.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Bug Fixes
  if (categories.fixes.length > 0) {
    changelog += `## 🐛 Bug Fixes

${categories.fixes.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Performance Improvements
  if (categories.perf.length > 0) {
    changelog += `## 🚀 Performance Improvements

${categories.perf.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Documentation
  if (categories.docs.length > 0) {
    changelog += `## 📚 Documentation

${categories.docs.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Code Refactoring
  if (categories.refactor.length > 0) {
    changelog += `## 🔧 Code Refactoring

${categories.refactor.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Styles
  if (categories.styles.length > 0) {
    changelog += `## 💄 Styles

${categories.styles.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Tests
  if (categories.tests.length > 0) {
    changelog += `## 🧪 Tests

${categories.tests.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Chore
  if (categories.chore.length > 0) {
    changelog += `## 🏠 Chore

${categories.chore.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Other changes
  if (categories.other.length > 0) {
    changelog += `## 🔀 Other Changes

${categories.other.map(commit => formatCommit(commit)).join('\n')}

`;
  }

  // Footer
  changelog += `---

**Full Changelog**: [v${previousVersion || '0.0.0'}...v${version}](../../compare/v${previousVersion || '0.0.0'}...v${version})
`;

  return changelog;
}

/**
 * Update the main CHANGELOG.md file
 */
function updateMainChangelog(version, previousVersion, commits) {
  const categories = categorizeCommits(commits);
  const date = new Date().toISOString().split('T')[0];
  
  let existingContent = '';
  if (existsSync(MAIN_CHANGELOG)) {
    existingContent = readFileSync(MAIN_CHANGELOG, 'utf-8');
  }

  // Create the new entry
  let newEntry = `## [${version}](./changelogs/v${version}.md) - ${date}

`;

  // Add brief summary for main changelog
  const totalChanges = Object.values(categories).flat().length;
  if (totalChanges > 0) {
    const breakingCount = categories.breaking.length;
    const featureCount = categories.features.length;
    const fixCount = categories.fixes.length;

    const summaryParts = [];
    if (breakingCount > 0) summaryParts.push(`${breakingCount} breaking change${breakingCount === 1 ? '' : 's'}`);
    if (featureCount > 0) summaryParts.push(`${featureCount} new feature${featureCount === 1 ? '' : 's'}`);
    if (fixCount > 0) summaryParts.push(`${fixCount} bug fix${fixCount === 1 ? '' : 'es'}`);

    if (summaryParts.length > 0) {
      newEntry += `**Highlights**: ${summaryParts.join(', ')}\n\n`;
    }

    // Show top changes in each category (limit to 3 per category)
    if (categories.breaking.length > 0) {
      newEntry += `### ⚠️ Breaking Changes\n${categories.breaking.slice(0, 3).map(commit => formatCommit(commit, false)).join('\n')}\n\n`;
    }
    if (categories.features.length > 0) {
      newEntry += `### ✨ Features\n${categories.features.slice(0, 3).map(commit => formatCommit(commit, false)).join('\n')}\n\n`;
    }
    if (categories.fixes.length > 0) {
      newEntry += `### 🐛 Fixes\n${categories.fixes.slice(0, 3).map(commit => formatCommit(commit, false)).join('\n')}\n\n`;
    }

    if (totalChanges > 9) {
      newEntry += `*...and ${totalChanges - 9} more changes*\n\n`;
    }
  } else {
    newEntry += `No significant changes in this release.\n\n`;
  }

  newEntry += `[View full changelog](./changelogs/v${version}.md)\n\n`;

  // Create new changelog content
  let newContent;
  if (existingContent.includes('# Changelog')) {
    // Insert after the header
    const lines = existingContent.split('\n');
    const headerIndex = lines.findIndex(line => line.startsWith('# Changelog'));
    if (headerIndex !== -1) {
      lines.splice(headerIndex + 2, 0, newEntry);
      newContent = lines.join('\n');
    } else {
      newContent = `# Changelog\n\n${newEntry}${existingContent}`;
    }
  } else {
    newContent = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

${newEntry}${existingContent}`;
  }

  writeFileSync(MAIN_CHANGELOG, newContent);
}

/**
 * Main execution function
 */
function generateChangelog(forceVersion = null) {
  console.log('📝 Generating changelog...');
  
  const currentVersion = forceVersion || getCurrentVersion();
  const previousVersion = getPreviousVersion();
  
  console.log(`📦 Current version: ${currentVersion}`);
  console.log(`📦 Previous version: ${previousVersion || 'none'}`);
  
  // Get commits since last version
  const commits = getCommitsSinceLastVersion(previousVersion);
  console.log(`📊 Found ${commits.length} commits since last version`);
  
  if (commits.length === 0 && !forceVersion) {
    console.log('⏭️  No new commits found, skipping changelog generation');
    return;
  }
  
  // Generate version-specific changelog
  const versionChangelog = generateVersionChangelog(currentVersion, commits, previousVersion);
  const versionFile = join(CHANGELOG_DIR, `v${currentVersion}.md`);
  
  writeFileSync(versionFile, versionChangelog);
  console.log(`✅ Generated version changelog: changelogs/v${currentVersion}.md`);
  
  // Update main changelog
  updateMainChangelog(currentVersion, previousVersion, commits);
  console.log(`✅ Updated main changelog: CHANGELOG.md`);
  
  console.log('🎉 Changelog generation complete!');
}

// Command line usage
const args = process.argv.slice(2);
const forceVersion = args.includes('--version') ? args[args.indexOf('--version') + 1] : null;

generateChangelog(forceVersion);

export { generateChangelog };
