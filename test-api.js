
const fetch = require('node-fetch'); // Or use built-in fetch in newer Node

async function testApi() {
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'Hello',
                history: []
            })
        });

        const status = response.status;
        const text = await response.text();

        console.log('Status:', status);
        console.log('Body:', text);
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi();
