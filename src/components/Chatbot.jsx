// src/components/Chatbot.jsx
import React, { useState } from 'react';

const insights = [
  `Your bus fleet is running at 87.8% capacity with 1623 of 1847 buses operational. Currently, 178 vehicles are under maintenance and there are 23 critical alerts. Given the average fleet age of 8.2 years, prioritize addressing those critical alerts to minimize downtime.`,
  
  `Train operations look solid: 1398 out of 1492 trains are active (93.7%), with only 67 in maintenance and 8 in critical status. However, the fleet’s average age of 12.5 years suggests you should start planning future upgrades.`,
  
  `Track health is 88.7% overall—198.7 of 224.1 miles are in good condition. About 18.9 miles need maintenance and 6.5 miles require immediate attention. Scheduling repairs for those critical sections will improve safety.`,
  
  `This month’s maintenance bill is projected at $485K for buses, $892K for trains, and $1.25M for tracks, totaling around $2.627M. Keep an eye on these figures to stay within budget.`,
  
  `Upcoming in the next 14 days:  
   • Medium priority: BUS‑4521 oil change on July 5 ($85)  
   • High priority: TRAIN‑302 brake inspection on July 3 ($1,200)  
   • Critical: TRACK‑ML‑15 rail replacement on July 8 ($45,000)  
   • High priority: BUS‑7829 transmission service on July 6 ($850)  
   • Medium priority: TRAIN‑118 motor overhaul on July 12 ($8,500)`  
];

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi there! I'm MainGo AI. Need any operational insights today?" }
  ]);
  const [input, setInput] = useState('');

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

  return (
    <div className="fixed bottom-0 right-0 m-4 w-80 bg-white shadow-xl rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-blue-900 text-white px-4 py-2 font-bold">
        maingoAI
      </div>

      {/* Message Stream */}
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
