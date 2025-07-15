// src/components/Chatbot.jsx
import React, { useState } from 'react';

const insights = [
  `Your bus fleet is running at 87.8% capacity with 1623 of 1847 buses operational. Currently, 178 vehicles are under maintenance and there are 23 critical alerts. Given the average fleet age of 8.2 years, prioritize addressing those critical alerts to minimize downtime.`,
  
  `Train operations look solid: 1398 out of 1492 trains are active (93.7%), with only 67 in maintenance and 8 in critical status. However, the fleet’s average age of 12.5 years suggests you should start planning future upgrades.`,
  
  `Track health is 88.7% overall—198.7 of 224.1 miles are in good condition. About 18.9 miles need maintenance and 6.5 miles require immediate attention. Scheduling repairs for those critical sections will improve safety.`,
  
  `This month’s maintenance bill is projected at $485K for buses, $892K for trains, and $1.25M for tracks, totaling around $2.627M. Keep an eye on these figures to stay within budget.`,
  
  `Upcoming in the next 14 days:\n• MEDIUM  BUS‑4521 — Oil Change — $85  (Due: 2024‑07‑05)\n• HIGH   TRAIN‑302 — Brake Inspection — $1,200  (Due: 2024‑07‑03)\n• CRITICAL TRACK‑ML‑15 — Rail Replacement — $45,000  (Due: 2024‑07‑08)\n• HIGH   BUS‑7829 — Transmission Service — $850  (Due: 2024‑07‑06)\n• MEDIUM  TRAIN‑118 — Motor Overhaul — $8,500  (Due: 2024‑07‑12)`
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi there! I'm maingoAI. Need any operational insights today?" }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const botMsg = {
      from: 'bot',
      text: insights[Math.floor(Math.random() * insights.length)]
    };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  // Closed state: just the little robot button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg text-2xl"
        aria-label="Open chat"
      >
        🤖
      </button>
    );
  }

  // Open state: full chat panel
  return (
    <div
      className="fixed bottom-4 right-4 w-80 bg-white shadow-xl rounded-lg 
                 flex flex-col overflow-hidden max-h-[80vh] z-40"
    >
      {/* Header with close button */}
      <div className="bg-blue-900 text-white px-4 py-2 font-bold flex justify-between items-center">
        <span>maingoAI</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl leading-none"
          aria-label="Close chat"
        >
          &times;
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] px-3 py-1 rounded ${
                msg.from === 'user' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
              } whitespace-pre-line`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex border-t">
        <input
          className="flex-1 p-2 outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 bg-blue-600 text-white hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
