import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import ImageGrid from '../components/ImageGrid';
import HistorySidebar from '../components/HistorySidebar';

export default function SearchPage({ user }){
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState({});
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);

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
    <div style={{display:'flex'}}>
      <div style={{flex:1, padding:20}}>
        <div style={{marginBottom:10}}>
          <strong>Top searches:</strong>
          {topSearches.map(t => <button key={t.term} onClick={() => { setTerm(t.term); }}>{t.term} ({t.count})</button>)}
        </div>

        <form onSubmit={doSearch}>
          <input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search images..." />
          <button type="submit">Search</button>
        </form>

        <div style={{marginTop:10}}>
          { total !== null && <div>You searched for "{term}" — {total} results.</div> }
          <div>Selected: {Object.keys(selected).length} images</div>
        </div>

        <ImageGrid images={results} selected={selected} toggleSelect={toggleSelect} />
      </div>

      <div style={{width:320, borderLeft:'1px solid #ddd', padding:10}}>
        <HistorySidebar history={history} />
      </div>
    </div>
  );
}


