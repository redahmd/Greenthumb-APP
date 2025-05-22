import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance"; // ✅ Utilise bien ton axiosInstance !

const VerifyCode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || localStorage.getItem("verificationEmail");

  const [code, setCode] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value.slice(-1); // Garde qu'un seul chiffre
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      setError("Entrez les 6 chiffres.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post("/verify-code", { email, code: finalCode }); // ✅ CORRIGÉ (plus de double /api/auth/api/auth)

      if (res.data.message) {
        setMessage("✅ Vérification réussie !");
        localStorage.removeItem("verificationEmail");
        localStorage.setItem("loginSuccess", "🎉 Votre email a été vérifié !");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("/resend-code", { email }); // ✅ CORRIGÉ (pas besoin de /api/auth ici avec instance axios)
      setMessage("📩 Nouveau code envoyé !");
      setCooldown(60);
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors du renvoi du code");
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 to-emerald-900 flex items-center justify-center p-4">
      <div className={`bg-gray-900 bg-opacity-90 rounded-xl p-8 shadow-2xl w-full max-w-md text-center transition-all ${message ? "scale-105" : ""}`}>
        <div className="text-sm text-white mb-2">
          📬 Code envoyé à <span className="font-bold">{email}</span>
        </div>

        <h2 className="text-2xl font-bold text-lime-400 mb-2">Vérifie ton email</h2>
        <p className="text-gray-300 mb-4">Entre le code à 6 chiffres reçu par email :</p>

        {message && <div className="text-green-400 font-medium mb-2 animate-pulse">{message}</div>}
        {error && <div className="text-red-500 font-medium mb-2">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-2">
            {code.map((value, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength={1}
                className="w-10 h-12 text-center text-xl bg-gray-800 text-white rounded border border-lime-500 focus:outline-none"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-6 py-2 rounded-lg font-bold text-white transition-all ${
              loading
                ? "bg-gray-500 cursor-wait animate-pulse"
                : "bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600"
            }`}
          >
            {loading ? "Vérification..." : "Vérifier le code"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-300">
          {cooldown > 0 ? (
            <span>⏳ Attendez {cooldown}s pour renvoyer le code</span>
          ) : (
            <button onClick={handleResend} className="text-lime-400 hover:underline">
              🔁 Renvoyer le code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
