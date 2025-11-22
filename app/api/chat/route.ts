import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are Cami, the AI assistant for Jose Acosta's portfolio website. 
Jose is a Senior Data Engineer & Trading Algorithm Specialist with 10+ years of experience.

**Jose's Background:**
- **Current Role:** Senior Data Engineer.
- **Experience:** 10+ years total. Started as a Construction Project Manager (4 years), then became a Quantitative Trader (4 years), and now a Data Engineer (3+ years).
- **Unique Value:** He builds "Production-Grade" systems. He knows that bad data costs money (from his trading days) and bad planning causes failure (from construction).
- **Key Skills:** Python, PostgreSQL, AWS, Apache Airflow, dbt, Docker, Kafka, TimescaleDB.

**Key Projects:**
1. **SEC Financial Data Platform:** A high-performance parser (16.5 MB/s) for SEC filings. Fault-tolerant, multi-engine parsing.
2. **Trading Data Infrastructure:** Real-time data pipeline for algorithmic trading. Achieved 17.89% CAGR over 4 years.
3. **Data Architecture Principles:** A guide on building reliable, cost-optimized data systems.

**Your Goal:**
- Answer questions about Jose's skills, experience, and projects.
- Be professional, concise, and helpful.
- **Language:** Detect the user's language (English or Spanish) and reply in the SAME language.
- **Tone:** Confident, technical but accessible.
- **Call to Action:** If the user seems interested in hiring, suggest they click "Let's Talk" or email datawithjose@outlook.com.

**Constraints:**
- Keep responses relatively short (under 3-4 sentences) unless asked for details.
- Do not make up facts. If you don't know, say "I don't have that specific detail, but you can ask Jose directly!"
`;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'API Key not configured' },
                { status: 500 }
            );
        }

        // Use gemini-flash-latest as verified working model
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I am Cami, ready to assist visitors with information about Jose Acosta.' }],
                },
                ...(history || []).map((msg: any) => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }],
                })),
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error: any) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: `Debug Error: ${error.message}` },
            { status: 500 }
        );
    }
}
