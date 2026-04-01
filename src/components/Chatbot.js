import React, { useState } from "react";

function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I am your Placement Assistant. Ask me anything!", sender: "bot" },
  ]);

  // 🧠 Simple AI logic
  const getResponse = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("prepare")) {
      return "Start with DSA, Aptitude, and Practice Coding daily.";
    }
    if (msg.includes("skills")) {
      return "Focus on DSA, Web Dev, DBMS, OS, and Projects.";
    }
    if (msg.includes("google")) {
      return "Google needs strong DSA, System Design, and problem-solving.";
    }
    if (msg.includes("aptitude")) {
      return "Practice Quantitative, Logical reasoning daily (use IndiaBix).";
    }
    if (msg.includes("resume")) {
      return "Keep resume clean, include projects, skills, and achievements.";
    }

    return "I recommend focusing on coding, aptitude, and mock interviews 👍";
  };

  // SEND MESSAGE
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    const botMsg = { text: getResponse(input), sender: "bot" };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="chat-page">
      <div className="chat-box">

        <h2>Placement Assistant 🤖</h2>

        {/* CHAT */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={msg.sender}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about placements..."
          />
          <button onClick={handleSend}>Send</button>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;