import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../Input";
import axios from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post("/forgot-password", { email });
      if (res.data.success) {
        setSuccessMsg("Un lien de réinitialisation a été envoyé à votre adresse email.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-lime-600">
          Mot de passe oublié
        </h2>

        {successMsg && (
          <div className="text-green-600 font-semibold mb-4 text-center">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="text-red-600 font-semibold mb-4 text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            name="email"
            placeholder="Entrez votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-lime-500 text-white font-bold rounded-lg hover:bg-lime-600"
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <Link to="/login" className="text-lime-600 hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
