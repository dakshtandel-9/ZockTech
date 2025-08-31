'use client';
import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Load messages from localStorage on component mount
    useEffect(() => {
        const savedMessages = localStorage.getItem('chatbot-messages');
        if (savedMessages) {
            try {
                const parsedMessages = JSON.parse(savedMessages);
                setMessages(parsedMessages);
            } catch (error) {
                console.error('Error parsing saved messages:', error);
                // If parsing fails, start with default message
                const defaultMessage = {
                    id: 1,
                    text: "Hello! I'm your AI assistant. How can I help you today?",
                    sender: 'bot',
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages([defaultMessage]);
                localStorage.setItem('chatbot-messages', JSON.stringify([defaultMessage]));
            }
        } else {
            // No saved messages, start with default
            const defaultMessage = {
                id: 1,
                text: "Hello! I'm your AI assistant. How can I help you today?",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages([defaultMessage]);
            localStorage.setItem('chatbot-messages', JSON.stringify([defaultMessage]));
        }
    }, []);

    // Save messages to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatbot-messages', JSON.stringify(messages));
        }
    }, [messages]);

    const webhookUrl = 'https://dakshtandel.app.n8n.cloud/webhook/81bfb9f5-e6dd-4d5f-80e9-97eab5363f08';

    // Function to format menu text into table HTML
    const formatMenuResponse = (text) => {
        // Check if the response contains menu items
        if (text.toLowerCase().includes('menu') || text.includes('**') || text.includes('$')) {
            // Parse the menu text and convert to table format
            const lines = text.split('\n');
            let tableHTML = '<div class="menu-table mb-2"><table class="w-full border-collapse border border-gray-300 text-xs bg-white rounded-lg overflow-hidden"><thead><tr class="bg-blue-100"><th class="border border-gray-300 px-2 py-1 text-left font-semibold">Category</th><th class="border border-gray-300 px-2 py-1 text-left font-semibold">Item</th><th class="border border-gray-300 px-2 py-1 text-left font-semibold">Description</th><th class="border border-gray-300 px-2 py-1 text-right font-semibold">Price</th></tr></thead><tbody>';
            
            let currentCategory = '';
            let hasTableContent = false;
            
            lines.forEach(line => {
                line = line.trim();
                
                // Category headers (e.g., **Salads:** or **Main Course:**)
                if (line.startsWith('**') && line.endsWith(':**')) {
                    currentCategory = line.replace(/\*\*/g, '').replace(':', '');
                }
                // Menu items with various formats
                else if (line.startsWith('* **') && line.includes('$')) {
                    // Format: * **Item Name** - Description - $Price
                    const match = line.match(/\* \*\*(.+?)\*\* - (.+?) - \$(\d+(?:\.\d+)?)/);
                    if (match) {
                        const [, itemName, description, price] = match;
                        tableHTML += `<tr class="hover:bg-gray-50"><td class="border border-gray-300 px-2 py-1 font-medium text-blue-700">${currentCategory}</td><td class="border border-gray-300 px-2 py-1 font-semibold">${itemName}</td><td class="border border-gray-300 px-2 py-1 text-gray-600">${description}</td><td class="border border-gray-300 px-2 py-1 text-right font-bold text-green-600">$${price}</td></tr>`;
                        hasTableContent = true;
                    }
                }
                // Format: **Item Name** - Description. (Price: $XX.XX)
                else if (line.startsWith('**') && line.includes('(Price: $') && line.endsWith(')')) {
                    const match = line.match(/\*\*(.+?)\*\* - (.+?)\. \(Price: \$(\d+(?:\.\d+)?)\)/);
                    if (match) {
                        const [, itemName, description, price] = match;
                        tableHTML += `<tr class="hover:bg-gray-50"><td class="border border-gray-300 px-2 py-1 font-medium text-blue-700">${currentCategory}</td><td class="border border-gray-300 px-2 py-1 font-semibold">${itemName}</td><td class="border border-gray-300 px-2 py-1 text-gray-600">${description}</td><td class="border border-gray-300 px-2 py-1 text-right font-bold text-green-600">$${price}</td></tr>`;
                        hasTableContent = true;
                    }
                }
                // Alternative format: * Item Name - $Price
                else if (line.startsWith('* ') && line.includes('$') && !line.includes('**')) {
                    const match = line.match(/\* (.+?) - \$(\d+(?:\.\d+)?)/);
                    if (match) {
                        const [, itemName, price] = match;
                        tableHTML += `<tr class="hover:bg-gray-50"><td class="border border-gray-300 px-2 py-1 font-medium text-blue-700">${currentCategory}</td><td class="border border-gray-300 px-2 py-1 font-semibold">${itemName}</td><td class="border border-gray-300 px-2 py-1 text-gray-600">-</td><td class="border border-gray-300 px-2 py-1 text-right font-bold text-green-600">$${price}</td></tr>`;
                        hasTableContent = true;
                    }
                }
            });
            
            tableHTML += '</tbody></table></div>';
            
            // Only return table HTML if we found actual menu content
            if (hasTableContent) {
                return tableHTML;
            }
        }
        
        return text;
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Get recent messages for context (last 8 messages, excluding the current one)
            const recentMessages = messages.slice(-8).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text.replace(/<[^>]*>/g, ''), // Strip HTML for cleaner context
                timestamp: msg.timestamp
            }));

            // Create session ID based on user and date
            const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
            const sessionId = `web-user_${currentDate}`;
            
            const requestBody = {
                message: inputMessage,
                timestamp: new Date().toISOString(),
                userId: 'web-user',
                sessionId: sessionId,
                previousMessages: recentMessages
            };
            
            console.log('Sending POST request to:', webhookUrl);
            console.log('Request body:', requestBody);
            
            // Use POST method as the webhook expects POST requests
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'User-Agent': 'ZockTech-Chatbot/1.0'
                },
                body: JSON.stringify(requestBody),
                mode: 'cors'
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            let botResponse;
            if (response.ok) {
                let responseText;
                try {
                    // Try to parse as JSON first
                    const data = await response.json();
                    console.log('JSON response:', data);
                    responseText = data.output || data.response || data.message || data.text || JSON.stringify(data);
                } catch (jsonError) {
                    console.log('JSON parse failed, trying text:', jsonError);
                    // If not JSON, treat as plain text
                    responseText = await response.text();
                    console.log('Text response:', responseText);
                }
                
                // Format menu responses into table format
                const formattedText = formatMenuResponse(responseText || 'Hello! How can I help you today?');
                
                botResponse = {
                    id: Date.now() + 1,
                    text: formattedText,
                    isHTML: formattedText.includes('<table'),
                    sender: 'bot',
                    timestamp: new Date().toLocaleTimeString()
                };
            } else {
                console.error('Response not ok:', response.status, response.statusText);
                const errorText = await response.text();
                console.error('Error response body:', errorText);
                
                botResponse = {
                    id: Date.now() + 1,
                    text: `Sorry, I'm having trouble connecting right now. Server responded with: ${response.status} ${response.statusText}`,
                    sender: 'bot',
                    timestamp: new Date().toLocaleTimeString()
                };
            }

            setMessages(prev => [...prev, botResponse]);
        } catch (error) {
            console.error('Error sending message:', error);
            let errorText = 'Sorry, there was an error processing your message.';
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorText = 'Unable to connect to the AI service. Please check your internet connection.';
            } else if (error.message.includes('CORS')) {
                errorText = 'Connection blocked by security policy. Please contact support.';
            } else if (error.message.includes('memory') || error.message.includes('session')) {
                errorText = 'Memory service temporarily unavailable. Your message was received but context may be limited.';
            } else if (error.message.includes('timeout')) {
                errorText = 'Request timed out. Please try again with a shorter message.';
            }
            
            const errorMessage = {
                id: Date.now() + 1,
                text: errorText,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        const defaultMessage = {
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages([defaultMessage]);
        localStorage.setItem('chatbot-messages', JSON.stringify([defaultMessage]));
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                ) : (
                    <ChatBubbleLeftRightIcon className="h-6 w-6" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-40 w-[500px] h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ChatBubbleLeftRightIcon className="h-5 w-5" />
                            <h3 className="font-semibold">ZockTech Assistant</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={clearChat}
                                className="p-1 hover:bg-blue-700 rounded transition-colors duration-200"
                                title="Clear chat history"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs">Online</span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        message.sender === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                                    }`}
                                >
                                    {message.isHTML ? (
                                        <div 
                                            className="text-sm overflow-x-auto"
                                            dangerouslySetInnerHTML={{ __html: message.text }}
                                            style={{
                                                maxWidth: '100%'
                                            }}
                                        />
                                    ) : (
                                        <p className="text-sm">{message.text}</p>
                                    )}
                                    <p className={`text-xs mt-1 ${
                                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                        {message.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 rounded-lg rounded-bl-none border border-gray-200 p-3">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                                disabled={isLoading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors duration-200"
                            >
                                <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}