import React, { useState } from 'react';
import api from '../api';

export default function EnquiryForm({ productId = null, onSuccess = () => {} }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!form.name) e.name = 'Name is required';
    if (!form.email) e.email = 'Email required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.message) e.message = 'Message required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    api.post('/enquiries', { ...form, product_id: productId })
      .then(res => {
        setForm({ name:'', email:'', phone:'', message:''});
        onSuccess();
      }).catch(err => {
        console.error(err);
        alert('Submission failed');
      }).finally(()=>setLoading(false));
  }

  return (
    <form onSubmit={submit} style={{marginTop:12}}>
      <div>
        <label>Name *</label><br/>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
      </div>
      <div>
        <label>Email *</label><br/>
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
      </div>
      <div>
        <label>Phone</label><br/>
        <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
      </div>
      <div>
        <label>Message *</label><br/>
        <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
        {errors.message && <div style={{color:'red'}}>{errors.message}</div>}
      </div>
      <button className="button" type="submit" disabled={loading}>{loading? 'Sending...' : 'Send Enquiry'}</button>
    </form>
  );
}
