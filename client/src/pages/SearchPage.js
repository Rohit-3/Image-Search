import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import ImageGrid from '../components/ImageGrid';
import HistorySidebar from '../components/HistorySidebar';
import AccountSettings from '../components/AccountSettings';

export default function SearchPage({ user }){
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState({});
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchTop();
    fetchHistory();
  }, []);

  const fetchTop = async () => {
    const res = await axios.get('/top-searches');
    setTopSearches(res.data);
  };

  const fetchHistory = async () => {
    const res = await axios.get('/history');
    setHistory(res.data);
  };

  const doSearch = async (e) => {
    e.preventDefault();
    if (!term) return;
    const res = await axios.post('/search', { term });
    setResults(res.data.results);
    setTotal(res.data.total);
    setSelected({});
    fetchTop();
    fetchHistory();
  };

  const toggleSelect = (id, image) => {
    setSelected(prev => {
      const copy = {...prev};
      if (copy[id]) delete copy[id];
      else copy[id] = image;
      return copy;
    });
  };

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-lg font-semibold">MERN Image Search</div>
          <div className="text-sm text-slate-400">
            Hello, {user.displayName} · 
            <button onClick={() => setShowSettings(!showSettings)} className="text-slate-100 hover:underline ml-2">Settings</button> · 
            <a className="text-slate-100 hover:underline ml-2" href="http://localhost:5000/auth/logout">Logout</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div>
          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-400 mr-2">Top searches:</span>
              {topSearches.map(t => (
                <button className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-200 text-sm hover:bg-white/10" key={t.term} onClick={() => { setTerm(t.term); }}>{t.term} ({t.count})</button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
            <form onSubmit={doSearch} className="flex gap-2">
              <input className="flex-1 rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/40" value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search high-quality images on Unsplash..." />
              <button className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium shadow-lg shadow-blue-600/30" type="submit">Search</button>
            </form>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-400">
              { total !== null && <div>Query: <span className="text-slate-100 font-semibold">{term || '(none)'}</span> · {total} results</div> }
              <div>Selected: <span className="text-slate-100 font-semibold">{Object.keys(selected).length}</span> images</div>
            </div>
            <ImageGrid images={results} selected={selected} toggleSelect={toggleSelect} />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 h-fit">
          {showSettings ? (
            <AccountSettings user={user} onDataDeleted={() => window.location.reload()} />
          ) : (
            <HistorySidebar history={history} />
          )}
        </div>
      </div>
    </div>
  );
}


