import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = async (page = 1) => {
    try {
      // Laravel default pagination: ?page=1
      const res = await api.get(`/products?page=${page}`);
      // Laravel returns {data: [...], meta: {...}} or {data: {...}, links...} depending on version
      // Try to handle common shapes:
      const responseData = res.data;
      if (responseData.data && Array.isArray(responseData.data)) {
        setProducts(responseData.data);
        setMeta(responseData.meta || responseData);
      } else if (Array.isArray(responseData)) {
        setProducts(responseData);
        setMeta(null);
      } else if (responseData.data && responseData.data.data) {
        // nested
        setProducts(responseData.data.data);
        setMeta(responseData.data.meta);
      } else {
        setProducts(responseData.data || []);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products');
    }
  };

  useEffect(()=> { fetchProducts(page); }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts(page);
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Products</h2>
      <button onClick={() => navigate('/products/add')}>Add Product</button>
      <table border="1" cellPadding="8" cellSpacing="0" style={{marginTop:10}}>
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Description</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button onClick={() => navigate(`/products/edit/${p.id}`)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{marginLeft:6}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination meta={meta} onPageChange={(p)=> setPage(p)} />
    </div>
  );
}
