#!/usr/bin/env node

/**
 * Documentation Watch Script
 * 
 * Watches for changes in component files and automatically regenerates documentation
 */

import { watch } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');
const SRC_DIR = join(ROOT_DIR, 'src');

console.log('📝 Watching for component changes...');
console.log('🔄 Will auto-regenerate documentation on file changes');

// Watch the src directory for changes
watch(SRC_DIR, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.tsx') || filename.endsWith('.ts'))) {
    console.log(`\n🔄 Detected change in: ${filename}`);
    console.log('📚 Regenerating documentation...');
    
    try {
      execSync('node scripts/generate-docs.js', { 
        cwd: ROOT_DIR,
        stdio: 'inherit'
      });
      console.log('✅ Documentation updated successfully!\n');
    } catch (error) {
      console.error('❌ Error generating documentation:', error.message);
    }
  }
});

console.log('Press Ctrl+C to stop watching...');
