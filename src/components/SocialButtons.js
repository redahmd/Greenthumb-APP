// src/components/SocialButtons.jsx
import React from "react";

const SocialButtons = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/social/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/social/facebook";
  };

  return (
    <div className="flex gap-2 mt-4">
      <button onClick={handleGoogleLogin} className="bg-red-500 text-white px-4 py-2 rounded">Google</button>
      <button onClick={handleFacebookLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Facebook</button>
    </div>
  );
};

export default SocialButtons;
