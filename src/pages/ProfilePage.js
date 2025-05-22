// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../components/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    phone: '',
    type: '',
    region: '',
    plants: '',
    photo: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/users/me');
        console.log("Profil utilisateur :", res.data.user);
        setFormData((prev) => ({
          ...prev,
          ...res.data.user
        }));
        if (res.data.user.photo) {
          setImagePreview(
            res.data.user.photo.startsWith('http')
              ? res.data.user.photo
              : `data:image/jpeg;base64,${res.data.user.photo}`
          );
        }
      } catch (err) {
        console.error('Erreur chargement profil :', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, photo: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axiosInstance.put(`/users/${formData._id}`, data);
      setSuccess('✅ Profil mis à jour avec succès !');
      setFormData(res.data);
    } catch (err) {
      console.error('❌ Erreur lors de la mise à jour du profil :', err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Chargement du profil...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-green-700">🌱 Mon Profil Jardinier</h2>

      {success && <p className="text-green-600 font-medium mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <input name="firstName" value={formData.firstName} onChange={handleChange}
            placeholder="Prénom" className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500" />

          <input name="lastName" value={formData.lastName} onChange={handleChange}
            placeholder="Nom" className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500" />

          <input name="phone" value={formData.phone} onChange={handleChange}
            placeholder="Téléphone" className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500" />

          <select name="type" value={formData.type} onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500">
            <option value="">Type de jardinier</option>
            <option value="Débutant">Débutant</option>
            <option value="Amateur">Amateur</option>
            <option value="Expert">Expert</option>
          </select>

          <input name="region" value={formData.region} onChange={handleChange}
            placeholder="Région climatique" className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500" />

          <input name="plants" value={formData.plants} onChange={handleChange}
            placeholder="Plantes préférées (séparées par virgules)" className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500" />
        </div>

        <div className="flex flex-col items-center justify-start gap-4">
          <label className="text-gray-700 font-medium">Photo de profil</label>
          <input type="file" accept="image/*" onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2" />
          {imagePreview && (
            <img src={imagePreview} alt="Aperçu" className="w-40 h-40 rounded-full object-cover shadow-lg border border-green-200" />
          )}
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold">
            Mettre à jour
          </button>
        </div>
      </form>

      {/* ✅ Affichage des infos en dessous du formulaire */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">📋 Informations sauvegardées :</h3>
        <ul className="text-gray-600 space-y-1">
          <li><strong>Nom :</strong> {formData.firstName} {formData.lastName}</li>
          <li><strong>Téléphone :</strong> {formData.phone}</li>
          <li><strong>Type :</strong> {formData.type}</li>
          <li><strong>Région :</strong> {formData.region}</li>
          <li><strong>Plantes :</strong> {formData.plants}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
