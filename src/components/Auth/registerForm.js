// src/components/RegisterForm.js
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Input';
import SocialButtons from '../SocialButtons';
import axiosInstance from '../../utils/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("❌ Les mots de passe ne correspondent pas.");
    }

    try {
      console.log("✅ Données envoyées à /auth/register:", formData);

      const response = await axiosInstance.post("/register", formData);
      const { data } = response;

      console.log("✅ Réponse serveur:", data);

      if (data.success || response.status === 201) {
        localStorage.setItem("verificationEmail", formData.email);
        navigate("/verify-code", { state: { email: formData.email } });
      } else {
        setError(data.message || "❌ Une erreur est survenue.");
      }
    } catch (err) {
      console.error("❌ Erreur:", err);
      const message = err.response?.data?.message;

      if (message?.includes("déjà utilisé")) {
        setError(`❌ ${message}`);
      } else {
        setError("❌ Erreur serveur lors de l'inscription.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md animate-fadeIn">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Créer un compte
        </h2>

        {error && (
          <div className="text-red-500 font-semibold mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={User}
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            icon={User}
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Input
            icon={User}
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
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
          <Input
            icon={Lock}
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600 transition duration-200"
          >
            S'INSCRIRE
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">Ou s'inscrire avec</div>
        <SocialButtons />

        <div className="mt-4 text-center text-sm text-gray-500">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-lime-600 hover:underline font-medium">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
