import React from 'react';
export default function Pagination({ total = 0, page = 1, limit = 6, onChange = () => {} }) {
  const totalPages = Math.ceil(total / limit) || 1;
  return (
    <div style={{marginTop:12, display:'flex', gap:8, alignItems:'center'}}>
      <button className="button" onClick={()=>onChange(Math.max(1, page-1))} disabled={page<=1}>Prev</button>
      <div>Page {page} / {totalPages}</div>
      <button className="button" onClick={()=>onChange(Math.min(totalPages, page+1))} disabled={page>=totalPages}>Next</button>
    </div>
  );
}
