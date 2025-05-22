//chatbotform.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ChatbotForm() {
  const [formData, setFormData] = useState({
    plante: '', region: '', sol: '', climat: '', surface: '', eau: '', saison: '',
  });

  const [resultat, setResultat] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/recommandations', formData);
    setResultat(res.data);
  };

  return (
    <div style={{
      background: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>📝 Remplissez les infos de votre plante</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        ))}
        <button type="submit" style={{
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#4caf50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          🌿 Obtenir les recommandations
        </button>
      </form>

      {resultat && (
        <div style={{
          marginTop: '2rem',
          background: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #ddd'
        }}>
          <h3>📦 Résultats pour : <strong>{resultat.plante}</strong></h3>
          <ul style={{ paddingLeft: '1rem' }}>
            <li><strong>Arrosage :</strong> {resultat.arrosage}</li>
            <li><strong>Engrais :</strong> {resultat.engrais.type} ({resultat.engrais.frequence})</li>
            <li><strong>Plantation :</strong> {resultat.plantation}</li>
            <li><strong>Maladies fréquentes :</strong> {resultat.maladies.join(', ')}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
