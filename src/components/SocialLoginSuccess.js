// src/pages/SocialLoginSuccess.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialLoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]); // ✅ ajoute navigate ici

  return <p>Connexion en cours...</p>;
};

export default SocialLoginSuccess;
