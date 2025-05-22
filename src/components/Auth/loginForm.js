// src/components/LoginForm.js
import React, { useState, useEffect } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Input';
import SocialButtons from '../SocialButtons';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../AuthContext'; // <== AJOUT

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // <== AJOUT

  useEffect(() => {
    const msg = localStorage.getItem("loginSuccess");
    if (msg) {
      setSuccess(msg);
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const res = await axiosInstance.post("/login", formData);
      console.log("✅ Réponse serveur :", res.data); // DEBUG

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        // ENREGISTREMENT dans le contexte global
        login(res.data.user); // 👈✅ ça déclenche le changement global

        setSuccess("Connexion réussie !");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setError(res.data.message || "Email ou mot de passe incorrect.");
      }
    } catch (err) {
      console.error("❌ Erreur lors de la connexion :", err);
      const message =
        err.response?.data?.message ||
        "Erreur serveur. Veuillez réessayer plus tard.";
      setError(message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Connexion
        </h2>

        {success && (
          <div className="text-green-500 font-semibold mb-4 text-center">
            {success}
          </div>
        )}
        {error && (
          <div className="text-red-500 font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Adresse Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            icon={Lock}
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-lime-600 hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600"
          >
            Se connecter
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">Ou continuer avec</div>
        <SocialButtons />

        <div className="mt-4 text-center text-sm text-gray-500">
          Vous n'avez pas de compte ?{" "}
          <Link to="/register" className="text-lime-600 hover:underline font-medium">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
