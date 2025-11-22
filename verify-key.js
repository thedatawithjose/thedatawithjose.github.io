
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

async function verifyKey() {
    try {
        const envPath = path.join(__dirname, '.env.local');
        const content = fs.readFileSync(envPath, 'utf8');
        const match = content.match(/GEMINI_API_KEY=(.+)/);

        if (!match) {
            console.error('Key not found in .env.local');
            return;
        }

        const apiKey = match[1].trim();
        console.log(`Testing key: ${apiKey.substring(0, 5)}...`);

        const genAI = new GoogleGenerativeAI(apiKey);

        console.log('Trying gemini-flash-latest...');
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
            const result = await model.generateContent('Hello');
            console.log('gemini-flash-latest worked:', (await result.response).text());
        } catch (e) {
            console.log('gemini-flash-latest failed:', e.message);
        }

    } catch (error) {
        console.error('Script error:', error.message);
    }
}

verifyKey();
