// Script to fix Framer Motion LazyMotion compatibility
// This script converts all 'motion' imports to 'm' and updates component usage

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const appDir = path.join(__dirname, 'app');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace import { motion } from 'framer-motion' with import { m } from 'framer-motion'
    if (content.includes("import { motion } from 'framer-motion'")) {
        content = content.replace(/import\s+{\s*motion\s*}\s+from\s+'framer-motion'/g, "import { m } from 'framer-motion'");
        modified = true;
    }

    // Replace <motion. with <m.
    if (content.includes('<motion.')) {
        content = content.replace(/<motion\./g, '<m.');
        modified = true;
    }

    // Replace </motion. with </m.
    if (content.includes('</motion.')) {
        content = content.replace(/<\/motion\./g, '</m.');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
        return true;
    }
    return false;
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    let fixedCount = 0;

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            fixedCount += processDirectory(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
            if (fixFile(filePath)) {
                fixedCount++;
            }
        }
    });

    return fixedCount;
}

console.log('Fixing Framer Motion LazyMotion compatibility...\n');

let totalFixed = 0;
totalFixed += processDirectory(componentsDir);
totalFixed += processDirectory(appDir);

console.log(`\nDone! Fixed ${totalFixed} files.`);
