import React from 'react';

export default function Pagination({ meta, onPageChange }) {
  if (!meta) return null;
  const { current_page, last_page } = meta;
  const pages = [];
  for (let i = 1; i <= last_page; i++) pages.push(i);
  return (
    <div style={{marginTop:10}}>
      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)} disabled={p === current_page} style={{marginRight:5}}>
          {p}
        </button>
      ))}
    </div>
  );
}
