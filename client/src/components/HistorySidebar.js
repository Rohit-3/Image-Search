import React from 'react';

export default function HistorySidebar({ history }){
  return (
    <div>
      <h3 className="text-lg font-semibold">Your search history</h3>
      <ul className="mt-2 divide-y divide-white/10">
        {history.map(h => (
          <li key={h._id} className="py-2">
            <div className="font-medium">{h.term}</div>
            <div className="text-xs text-slate-400">{new Date(h.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


