'use client';

import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export default function KalyptoChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', content: "Hi! I'm Cami. Ask me anything about Jose's data engineering experience!" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        console.log('KalyptoChat mounted');
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;
        const userMessage = inputValue.trim();
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);
        try {
            // Use proxy API endpoint (configured via environment variable or default)
            const apiUrl = process.env.NEXT_PUBLIC_KALYPTO_API_URL || 'https://kalypto-api-proxy.vercel.app/api/chat';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                })
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMessages(prev => [...prev, { role: 'model', content: data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'model', content: 'Sorry, I encountered an error. Please try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <m.button
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-r from-[#005A9C] to-[#00BFA5] text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <i className="fas fa-times text-xl"></i>
                ) : (
                    <div className="w-full h-full rounded-full overflow-hidden border border-white flex items-center justify-center bg-white shadow-sm">
                        <img
                            src="/images/kalypto-icon.png"
                            alt="Cami AI"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </m.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-[9999] w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-[#005A9C] to-[#00BFA5] text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/50 overflow-hidden shadow-sm">
                                    <img
                                        src="/images/kalypto-icon.png"
                                        alt="Cami AI"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Cami AI</h3>
                                    <p className="text-xs text-white/80">Jose's Virtual Assistant</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[#005A9C] text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'}
                                    `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    placeholder="Ask about Jose's projects..."
                                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#00BFA5]/50 focus:border-[#00BFA5] transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="w-10 h-10 rounded-full bg-[#005A9C] text-white flex items-center justify-center hover:bg-[#004C85] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                                >
                                    <i className="fas fa-paper-plane text-xs"></i>
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-gray-400">Powered by Gemini AI</p>
                            </div>
                        </form>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
