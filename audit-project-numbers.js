// Script para auditar y actualizar números de proyectos
// Cambia todas las referencias de proyectos a 12

const fs = require('fs');
const path = require('path');

const updates = [
    // Cambiar "10+ Projects" a "12+ Projects" o "12 Projects"
    { pattern: /10\+.*Projects?/gi, replacement: '12+ Projects' },
    { pattern: /"10\+"/g, replacement: '"12+"' },
    { pattern: /value:\s*"10\+"/g, replacement: 'value: "12+"' },
    { pattern: /totalProjects:\s*'10\+'/g, replacement: "totalProjects: '12+'" },

    // Cambiar "15 projects" o "20 projects" a "12 projects"
    { pattern: /15\s*projects?/gi, replacement: '12 projects' },
    { pattern: /20\s*projects?/gi, replacement: '12 projects' },
    { pattern: /"15\+?"/g, replacement: '"12+"' },
    { pattern: /"20\+?"/g, replacement: '"12+"' },
];

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let changes = [];

    updates.forEach(({ pattern, replacement }) => {
        const matches = content.match(pattern);
        if (matches) {
            content = content.replace(pattern, replacement);
            modified = true;
            changes.push(`${pattern} -> ${replacement}`);
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Updated: ${filePath}`);
        changes.forEach(change => console.log(`  - ${change}`));
        return true;
    }
    return false;
}

function processDirectory(dir, extensions = ['.tsx', '.ts', '.jsx', '.js']) {
    const files = fs.readdirSync(dir);
    let updatedCount = 0;

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== '_next') {
            updatedCount += processDirectory(filePath, extensions);
        } else if (stat.isFile() && extensions.some(ext => file.endsWith(ext))) {
            if (updateFile(filePath)) {
                updatedCount++;
            }
        }
    });

    return updatedCount;
}

console.log('🔍 Auditando y actualizando números de proyectos...\n');

const appDir = path.join(__dirname, 'app');
const componentsDir = path.join(__dirname, 'components');

let totalUpdated = 0;
totalUpdated += processDirectory(appDir);
totalUpdated += processDirectory(componentsDir);

console.log(`\n✅ Auditoría completada! ${totalUpdated} archivos actualizados.`);
console.log('\n📊 Todos los números de proyectos ahora son consistentes: 12+ proyectos');
