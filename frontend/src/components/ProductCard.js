import React from 'react';

export default function ProductCard({ product, onView }) {
  return (
    <div className="card" role="article">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p style={{color:'#666'}}>{product.short_desc}</p>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8}}>
        <strong>₹{product.price}</strong>
        <button className="button" onClick={onView}>View</button>
      </div>
    </div>
  );
}
