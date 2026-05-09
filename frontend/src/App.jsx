import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditSong from './pages/EditSong';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
      
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
      />

      <Route 
        path="/songs/:id/edit" 
        element={isAuthenticated ? <EditSong /> : <Navigate to="/login" />} 
      />

      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;