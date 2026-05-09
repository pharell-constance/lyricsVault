import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Music } from 'lucide-react';
import SongForm from '../components/SongForm';

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/songs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSong(res.data);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        if (err.response?.status === 401) navigate('/login');
        if (err.response?.status === 404) navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchSong();
  }, [id, token, navigate]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:5001/api/songs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <p className="text-cyan-600 font-semibold text-lg">Chargement...</p>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white flex items-center justify-center">
        <p className="text-red-500 font-semibold text-lg">Chanson non trouvée</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
      {/* Navigation Top */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b-2 border-cyan-400 shadow-md h-14 flex items-center px-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 transition font-semibold text-sm"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline uppercase tracking-widest">Retour</span>
        </button>
      </nav>

      {/* Page Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-slideUp">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-cyan-100 rounded-xl">
                <Music className="text-cyan-600" size={32} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-cyan-900 mb-2">✏️ Éditer la chanson</h1>
            <p className="text-cyan-700">Modifie ton chef-d'œuvre</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-cyan-100">
            <SongForm initialData={song} onSubmit={handleSubmit} isLoading={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSong;
