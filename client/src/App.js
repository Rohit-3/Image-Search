import React, { useEffect, useState } from 'react';
import axios from './api/axiosConfig';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';

function App(){
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('/current_user').then(res => setUser(res.data.user));
  }, []);
  return user ? <SearchPage user={user} /> : <LoginPage />;
}

export default App;
