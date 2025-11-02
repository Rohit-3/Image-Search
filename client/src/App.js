import React, { useEffect, useState } from 'react';
import axios from './api/axiosConfig';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';

function App(){
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/current_user').then(res => setUser(res.data.user));
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100">
      {user ? <SearchPage user={user} /> : <LoginPage />}
    </div>
  );
}

export default App;
