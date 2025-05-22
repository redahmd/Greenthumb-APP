import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour 🌿 ! Pose-moi une question sur le jardinage.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { from: 'user', text: input }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', { question: input });
      const reply = res.data.reply;
      setMessages(prev => [...prev, { from: 'bot', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'bot', text: "😥 Une erreur est survenue." }]);
    }

    setInput('');
  };

  const suggestions = [
    "comment arroser les tomates",
    "quel engrais naturel choisir",
    "comment éviter le mildiou",
    "quand faire les semis de carottes",
    "comment préparer un bon sol",
    "entretien des courgettes",
    "traiter les pucerons naturellement",
    "jardinage avec la lune",
    "planter en période de pluie",
    "semis de printemps",
    "entretien du basilic",
    "comment contrôler la menthe",
    "quand tailler un rosier",
    "faire un bon compost",
    "protéger le jardin contre les limaces",
    "changer la couleur des hortensias",
    "rotation des cultures",
    "engrais naturel efficace",
    "travaux de jardin en automne",
    "plantes adaptées à l'ombre"
  ];
  

  return (
    <div style={{
      background: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '700px',
      margin: '2rem auto'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>🤖 Chatbot Horticole</h2>

      <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            textAlign: msg.from === 'user' ? 'right' : 'left',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              display: 'inline-block',
              background: msg.from === 'user' ? '#d4edda' : '#e2e3e5',
              padding: '0.5rem 1rem',
              borderRadius: '10px'
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Suggestions cliquables */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => {
              setInput(suggestion);
              setTimeout(handleSend, 100);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e0f7fa',
              border: '1px solid #ccc',
              borderRadius: '1rem',
              cursor: 'pointer'
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Zone de saisie */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          placeholder="Pose ta question ici..."
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button onClick={handleSend} style={{
          padding: '0.75rem 1rem',
          background: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Envoyer
        </button>
      </div>
    </div>
  );
}
