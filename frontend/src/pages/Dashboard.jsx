import { useState, useEffect } from 'react';
import { Music, Plus, LogOut, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';
import SongForm from '../components/SongForm';

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSongs();
    spawnSnowflakes();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/songs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSongs(res.data);
    } catch (err) {
      console.error("Erreur de récupération", err);
      if (err.response?.status === 401) handleLogout();
    }
  };

  const handleCreateSong = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5001/api/songs', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Chanson créée:', response.data);
      setIsCreateModalOpen(false);
      await fetchSongs();
    } catch (err) {
      console.error('Erreur création:', err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Erreur lors de la création';
      throw new Error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSong = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette chanson ?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5001/api/songs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSongs(songs.filter(s => s._id !== id));
    } catch (err) {
      console.error('Erreur de suppression:', err);
      alert('Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const spawnSnowflakes = () => {
    const container = document.body;
    setInterval(() => {
      const f = document.createElement('div');
      f.className = 'snowflake';
      f.style.left = Math.random() * 100 + '%';
      const size = Math.random() * 5 + 3;
      f.style.width = f.style.height = size + 'px';
      f.style.animationDuration = (Math.random() * 10 + 8) + 's';
      f.style.animationDelay = (Math.random() * 4) + 's';
      container.appendChild(f);
      setTimeout(() => f.remove(), 20000);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-cyan-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b-2 border-cyan-400 shadow-md h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Music className="text-cyan-500" size={28} />
          <h1 className="text-lg font-bold text-cyan-700">LyricsVault ❄️</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition font-semibold text-sm"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Quitter</span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 text-center animate-slideUp">
        <div className="inline-block mb-4 px-4 py-2 bg-cyan-100 border border-cyan-300 rounded-full">
          <span className="text-xs font-bold uppercase tracking-wide text-cyan-700">Mon Coffre Musical</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-cyan-900 mb-3">Bienvenue dans LyricsVault</h2>
        <p className="text-cyan-700 max-w-2xl mx-auto text-lg">Crée, édite et garde tes paroles en sécurité ❄️✨</p>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Button Card */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="group col-span-1 border-2 border-dashed border-cyan-300 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer min-h-60 animate-slideUp"
          >
            <div className="mb-3 p-3 bg-cyan-100 rounded-xl group-hover:scale-110 transition-transform">
              <Plus className="text-cyan-600" size={32} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-cyan-700">Nouvelle Musique</span>
            <p className="text-xs text-cyan-500 mt-2">Commence une nouvelle chanson</p>
          </button>

          {/* Songs Grid */}
          {songs.map((song, index) => (
            <div
              key={song._id}
              onClick={() => navigate(`/songs/${song._id}/edit`)}
              className="card group min-h-60 cursor-pointer flex flex-col animate-slideUp"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <Music className="text-cyan-600" size={20} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSong(song._id);
                  }}
                  disabled={deletingId === song._id}
                  className="p-2 hover:bg-red-100 rounded-lg transition opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>

              <span className="inline-block w-fit badge mb-3">
                {song.status === 'Brouillon' && '📝'}
                {song.status === 'En cours' && '🎵'}
                {song.status === 'Terminé' && '✅'}
                {song.status === 'Publiée' && '🎤'}
                {' '}{song.status}
              </span>

              <h3 className="text-lg font-bold text-cyan-900 mb-3 line-clamp-2">{song.title}</h3>
              <p className="text-cyan-700 text-sm line-clamp-3 flex-grow italic">
                {song.lyrics ? `"${song.lyrics.substring(0, 80)}..."` : "Pas encore de paroles..."}
              </p>

              <div className="flex items-center gap-2 mt-4 text-cyan-500 opacity-0 group-hover:opacity-100 transition text-xs">
                <Edit2 size={14} />
                <span>Cliquer pour éditer</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {songs.length === 0 && (
          <div className="text-center py-16">
            <Music className="mx-auto text-cyan-300 mb-4" size={56} />
            <h3 className="text-2xl font-bold text-cyan-900 mb-2">Aucune chanson pour le moment...</h3>
            <p className="text-cyan-700 mb-6">Commence par créer ta première mélodie! 🎵</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 py-3 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-600 transition"
            >
              Créer ma première chanson
            </button>
          </div>
        )}
      </main>

      {/* Modal de création */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="✨ Nouvelle Chanson"
      >
        <SongForm onSubmit={handleCreateSong} isLoading={isSubmitting} />
      </Modal>
    </div>
  );
};

export default Dashboard;