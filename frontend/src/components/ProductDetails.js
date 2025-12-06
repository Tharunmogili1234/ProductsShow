import React from 'react';
import EnquiryForm from './EnquiryForm';

export default function ProductDetails({ product, onClose }) {
  const [showForm, setShowForm] = React.useState(false);
  if (!product) return null;

  return (
    <div className="card" style={{marginTop:12}}>
      <button onClick={onClose} style={{float:'right'}}>Close</button>
      <img src={product.image_url} alt={product.name} />
      <h2>{product.name}</h2>
      <p><em>{product.category}</em></p>
      <p>{product.long_desc || product.short_desc}</p>
      <p><strong>₹{product.price}</strong></p>
      <button className="button" onClick={() => setShowForm(s => !s)}>{showForm ? 'Hide Enquiry' : 'Enquire'}</button>
      {showForm && <EnquiryForm productId={product.id} onSuccess={() => { setShowForm(false); alert('Enquiry sent'); }} />}
    </div>
  );
}
