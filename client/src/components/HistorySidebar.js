import React from 'react';

export default function HistorySidebar({ history }){
  return (
    <div>
      <h3>Your search history</h3>
      <ul style={{listStyle:'none', padding:0}}>
        {history.map(h => (
          <li key={h._id} style={{padding:'6px 0', borderBottom:'1px solid #eee'}}>
            <div><strong>{h.term}</strong></div>
            <div style={{fontSize:12, color:'#666'}}>{new Date(h.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


