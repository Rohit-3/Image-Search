import React from 'react';

export default function ImageGrid({ images, selected, toggleSelect }){
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginTop:20}}>
      {images.map(img => (
        <div key={img.id} style={{position:'relative'}}>
          <img src={img.urls.small} alt={img.alt_description} style={{width:'100%', height:200, objectFit:'cover'}} />
          <label style={{position:'absolute', top:8, right:8, background:'rgba(255,255,255,0.8)', padding:4, borderRadius:4}}>
            <input type="checkbox" checked={!!selected[img.id]} onChange={()=>toggleSelect(img.id, img)} />
          </label>
        </div>
      ))}
    </div>
  );
}


