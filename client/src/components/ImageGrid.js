import React from 'react';

export default function ImageGrid({ images, selected, toggleSelect }){
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
      {images.map(img => (
        <div key={img.id} className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950/40">
          <img src={img.urls.small} alt={img.alt_description || 'image'} className="w-full h-[220px] object-cover block" />
          <label className="absolute top-2 right-2 rounded-md border border-white/20 bg-slate-900/70 px-2 py-1 text-xs text-slate-200">
            <input type="checkbox" checked={!!selected[img.id]} onChange={()=>toggleSelect(img.id, img)} />
          </label>
        </div>
      ))}
    </div>
  );
}


