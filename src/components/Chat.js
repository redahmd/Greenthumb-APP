// components/Chat.js
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [quiz] = useState({ q: "Quelle plante aime le soleil ?", a: "Cactus" });
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [resMessages, resUser] = await Promise.all([
          fetch("http://localhost:5000/api/messages", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [msgs, user] = await Promise.all([resMessages.json(), resUser.json()]);

        const sorted = msgs.sort((a, b) => new Date(a.time) - new Date(b.time));
        setMessages(sorted);
        setUserId(user._id);
      } catch (err) {
        console.error("Erreur de chargement :", err);
      }
    };

    fetchData();

    socket.on("new_message", (msg) => {
      setMessages((prev) =>
        [...prev, msg].sort((a, b) => new Date(a.time) - new Date(b.time))
      );
    });

    socket.on("delete_message", (id) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    });

    return () => {
      socket.off("new_message");
      socket.off("delete_message");
    };
  }, [token]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: message,
          time: new Date().toISOString(),
        }),
      });
      setMessage("");
    } catch (err) {
      console.error("Erreur d'envoi :", err);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Erreur : ${errorData.message}`);
      }
    } catch (err) {
      console.error("Erreur de suppression :", err);
    }
  };


  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === quiz.a.toLowerCase()) {
      alert("✅ Bonne réponse !");
    } else {
      alert("❌ Mauvaise réponse !");
    }
    setAnswer("");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen p-4 font-sans bg-white text-black dark:bg-[#111] dark:text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">💬 Chat communautaire</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? "☀️ Mode clair" : "🌙 Mode sombre"}
          </button>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto border border-gray-300 dark:border-gray-600 mb-4 p-3 rounded bg-[#f4f4f4] dark:bg-[#222]">
          {messages.map((msg) => {
            const isOwn = msg.author?._id === userId;
            const authorName = msg.author?.username || "Anonyme";

            return (
              <div
                key={msg._id}
                className={`mb-3 flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg shadow ${
                    isOwn
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <div className="text-sm font-semibold mb-1">{authorName}</div>
                  <div>{msg.text}</div>
                  <div className="text-xs mt-1 opacity-70 text-right">
                    {new Date(msg.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {isOwn && (
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="mt-1 text-xs text-red-300 hover:text-red-500"
                    >
                      🗑 Supprimer
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Écris ton message..."
            className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📤 Envoyer
          </button>
        </div>

        {/* Quiz */}
        <div className="bg-[#f4fbea] dark:bg-[#222] p-4 rounded shadow-md">
          <h3 className="text-lg font-semibold mb-2">🍃 Quiz botanique</h3>
          <p className="mb-2">{quiz.q}</p>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Votre réponse"
            className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full mb-2 bg-white dark:bg-gray-800 text-black dark:text-white"
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Vérifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
