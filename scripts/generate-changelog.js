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
    // Get all version tags sorted by version
    const tags = execSync('git tag --sort=-version:refname', { 
      encoding: 'utf-8',
      cwd: ROOT_DIR 
    }).trim().split('\n').filter(Boolean);
    
    // Filter only version tags (v1.0.0, 1.0.0, etc.)
    const versionTags = tags.filter(tag => 
      tag.match(/^v?\d+\.\d+\.\d+$/)
    );
    
    // Get current version to find the previous one
    const currentVersion = getCurrentVersion();
    const currentVersionTag = versionTags.find(tag => 
      tag === `v${currentVersion}` || tag === currentVersion
    );
    
    // If current version exists as a tag, get the next one
    if (currentVersionTag) {
      const currentIndex = versionTags.indexOf(currentVersionTag);
      return currentIndex < versionTags.length - 1 ? versionTags[currentIndex + 1] : null;
    }
    
    // If current version doesn't exist as tag, return the latest tag
    return versionTags.length > 0 ? versionTags[0] : null;
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
 * Detect component-related changes from commits and file changes
 */
function detectComponentChanges(commits) {
  const componentChanges = {
    created: [],
    modified: [],
    deprecated: []
  };

  commits.forEach(commit => {
    const { hash, subject, body } = commit;
    
    try {
      // Get files changed in this commit
      const filesChanged = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
        encoding: 'utf-8',
        cwd: ROOT_DIR
      }).trim().split('\n').filter(Boolean);

      // Check for new component files
      const componentFiles = filesChanged.filter(file => isComponentFile(file));

      componentFiles.forEach(file => {
        const componentName = extractComponentNameFromPath(file);
        if (!componentName) return;

        try {
          // Check if this is a new file (doesn't exist in parent commit)
          execSync(`git cat-file -e ${hash}~1:${file} 2>nul`, {
            encoding: 'utf-8',
            cwd: ROOT_DIR,
            stdio: 'pipe'
          });
          
          // File existed before, so it's modified
          if (!componentChanges.modified.find(c => c.name === componentName)) {
            componentChanges.modified.push({
              name: componentName,
              file: file,
              commit: commit
            });
          }
        } catch (error) {
          // File didn't exist before, so it's new
          if (!componentChanges.created.find(c => c.name === componentName)) {
            try {
              const fileContent = execSync(`git show ${hash}:${file}`, {
                encoding: 'utf-8',
                cwd: ROOT_DIR,
                stdio: 'pipe'
              });
              const description = extractComponentDescription(fileContent);
              
              componentChanges.created.push({
                name: componentName,
                file: file,
                commit: commit,
                description: description || `New ${componentName} component`
              });
            } catch (contentError) {
              // Fallback if we can't read the file content
              componentChanges.created.push({
                name: componentName,
                file: file,
                commit: commit,
                description: `New ${componentName} component`
              });
            }
          }
        }
      });

    } catch (error) {
      // Skip if we can't get file changes for this commit
    }
  });

  return deduplicateComponents(componentChanges);
}

/**
 * Extract component name from file path
 */
function extractComponentNameFromPath(filePath) {
  // Match patterns like: src/components/Button/index.tsx or src/components/Button/Button.tsx
  const match = filePath.match(/\/components\/([A-Z][a-zA-Z]+)\//);
  if (match) return match[1];

  // Match single file components: src/components/Button.tsx
  const singleFileMatch = filePath.match(/\/components\/([A-Z][a-zA-Z]+)\.tsx?$/);
  if (singleFileMatch) return singleFileMatch[1];

  return null;
}

/**
 * Extract component description from JSDoc comment
 */
function extractComponentDescription(content) {
  // Look for proper JSDoc comments (ignore random comments)
  const jsdocPatterns = [
    // Main JSDoc block: /** * Description */
    /\/\*\*\s*\n\s*\*\s*([^@\n*][^\n*]{10,})/,
    // Single line JSDoc: /** Description */
    /\/\*\*\s*([^@*][^*]{10,})\s*\*\//,
    // Component description pattern
    /\/\*\*[\s\S]*?\*\s*([A-Z][^@\n*]{15,}?)[\s\n*]/
  ];

  for (const pattern of jsdocPatterns) {
    const match = content.match(pattern);
    if (match) {
      let description = match[1].trim();
      // Clean up common JSDoc artifacts
      description = description
        .replace(/\s*\*+\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Only return if it's a meaningful description (not just "Props" or single words)
      if (description.length > 10 && !description.match(/^(props?|component|new)$/i)) {
        return description;
      }
    }
  }

  return null;
}

/**
 * Deduplicate component changes (remove modified if already in created)
 */
function deduplicateComponents(componentChanges) {
  // If a component is both created and modified, only show as created
  const createdNames = new Set(componentChanges.created.map(c => c.name));
  componentChanges.modified = componentChanges.modified.filter(
    c => !createdNames.has(c.name)
  );
  
  // Remove duplicates within each category
  componentChanges.created = componentChanges.created.filter((component, index, self) =>
    index === self.findIndex(c => c.name === component.name)
  );
  
  componentChanges.modified = componentChanges.modified.filter((component, index, self) =>
    index === self.findIndex(c => c.name === component.name)
  );
  
  return componentChanges;
}

/**
 * Check if a file is a component file
 */
function isComponentFile(filePath) {
  return filePath.match(/^src\/components\//) && 
         filePath.match(/\.(tsx?|jsx?)$/) &&
         !filePath.includes('.test.') &&
         !filePath.includes('.stories.') &&
         !filePath.includes('.spec.') &&
         !filePath.includes('/theme.') &&
         !filePath.endsWith('/theme.ts') &&
         !filePath.endsWith('/theme.js');
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
  const componentChanges = detectComponentChanges(commits);
  const date = new Date().toISOString().split('T')[0];
  
  let changelog = `# Changelog for v${version}

*Released on ${date}*

`;

  if (previousVersion) {
    changelog += `> **Comparison**: [v${previousVersion}...v${version}](../../compare/v${previousVersion}...v${version})

`;
  }

  // Add component summary if there are component changes
  const totalComponents = componentChanges.created.length + componentChanges.modified.length;
  if (totalComponents > 0) {
    changelog += `## 🧩 Component Changes

`;
    if (componentChanges.created.length > 0) {
      changelog += `**New Components:** ${componentChanges.created.map(c => c.name).join(', ')}\n`;
    }
    if (componentChanges.modified.length > 0) {
      changelog += `**Updated Components:** ${componentChanges.modified.map(c => c.name).join(', ')}\n`;
    }
    changelog += '\n';
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
    
    if (totalComponents > 0) {
      changelog += `- **Components**: ${totalComponents} change${totalComponents === 1 ? '' : 's'}\n`;
    }
    
    Object.entries(categories).forEach(([category, commits]) => {
      if (commits.length > 0) {
        const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
        changelog += `- **${categoryName}**: ${commits.length} change${commits.length === 1 ? '' : 's'}\n`;
      }
    });
    
    changelog += '\n';
  }

  // New Components Section (add this before breaking changes)
  if (componentChanges.created.length > 0) {
    changelog += `## 🆕 New Components

`;
    componentChanges.created.forEach(component => {
      const description = component.description || `New ${component.name} component`;
      const commitLink = `([${component.commit.hash}](../../commit/${component.commit.hash}))`;
      changelog += `- **${component.name}**: ${description} ${commitLink}\n`;
    });
    changelog += '\n';
  }

  // Component Updates Section
  if (componentChanges.modified.length > 0) {
    changelog += `## 🔄 Component Updates

`;
    componentChanges.modified.forEach(component => {
      const commitLink = `([${component.commit.hash}](../../commit/${component.commit.hash}))`;
      changelog += `- **${component.name}**: Updated ${commitLink}\n`;
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
  const componentChanges = detectComponentChanges(commits);
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
  const totalComponents = componentChanges.created.length + componentChanges.modified.length;
  
  if (totalChanges > 0) {
    const breakingCount = categories.breaking.length;
    const featureCount = categories.features.length;
    const fixCount = categories.fixes.length;

    const summaryParts = [];
    if (componentChanges.created.length > 0) summaryParts.push(`${componentChanges.created.length} new component${componentChanges.created.length === 1 ? '' : 's'}`);
    if (breakingCount > 0) summaryParts.push(`${breakingCount} breaking change${breakingCount === 1 ? '' : 's'}`);
    if (featureCount > 0) summaryParts.push(`${featureCount} new feature${featureCount === 1 ? '' : 's'}`);
    if (fixCount > 0) summaryParts.push(`${fixCount} bug fix${fixCount === 1 ? '' : 'es'}`);

    if (summaryParts.length > 0) {
      newEntry += `**Highlights**: ${summaryParts.join(', ')}\n\n`;
    }

    // Show new components first
    if (componentChanges.created.length > 0) {
      newEntry += `### 🆕 New Components\n`;
      componentChanges.created.slice(0, 3).forEach(component => {
        newEntry += `- **${component.name}**: ${component.description}\n`;
      });
      newEntry += '\n';
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

    const totalShown = (componentChanges.created.length > 0 ? Math.min(3, componentChanges.created.length) : 0) + 
                      Math.min(3, categories.breaking.length) + 
                      Math.min(3, categories.features.length) + 
                      Math.min(3, categories.fixes.length);
    
    if (totalChanges + totalComponents > totalShown) {
      newEntry += `*...and ${(totalChanges + totalComponents) - totalShown} more changes*\n\n`;
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
