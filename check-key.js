
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

try {
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/GEMINI_API_KEY=(.+)/);
        if (match) {
            const key = match[1].trim();
            console.log(`Found key: ${key.substring(0, 5)}...`);
        } else {
            console.log('GEMINI_API_KEY not found in .env.local');
        }
    } else {
        console.log('.env.local does not exist');
    }
} catch (error) {
    console.error('Error reading .env.local:', error);
}
