import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', price:'', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await api.get(`/products/${id}`);
          setForm({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description || '',
          });
        } catch (err) {
          console.error(err);
          alert('Failed to load product');
        }
      })();
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await api.put(`/products/${id}`, form);
        alert('Updated');
      } else {
        await api.post('/products', form);
        alert('Created');
      }
      navigate('/products');
    } catch (err) {
      console.error(err);
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>{id ? 'Edit' : 'Add'} Product</h2>
      <form onSubmit={submit}>
        <div><input required placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} /></div>
        <div><input required placeholder="Price" type="number" value={form.price} onChange={e => setForm({...form, price:e.target.value})} /></div>
        <div><textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description:e.target.value})} /></div>
        <button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={() => navigate('/products')} style={{marginLeft:8}}>Cancel</button>
      </form>
    </div>
  );
}
