import React, { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import Pagination from './Pagination';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [q, category, page]);

  function fetchProducts() {
    api.get('/products', { params: { search: q, category, page, limit } })
      .then(res => {
        setProducts(res.data.products || []);
        setTotal(res.data.pagination?.total || 0);
      }).catch(err => console.error(err));
  }

  return (
    <>
      <div className="controls">
        <input placeholder="Search by name" value={q} onChange={e => setQ(e.target.value)} />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option>Stationery</option><option>Electronics</option><option>Home</option><option>Garden</option><option>Books</option>
        </select>
        <button className="button" onClick={() => { setPage(1); fetchProducts(); }}>Apply</button>
      </div>

      <div className="grid">
        {products.map(p => (<ProductCard key={p.id} product={p} onView={() => setSelected(p)} />))}
      </div>

      <Pagination total={total} page={page} limit={limit} onChange={p => setPage(p)} />

      {selected && <ProductDetails product={selected} onClose={() => setSelected(null)} onEnquire={() => { }} />}
      <div className="footer">Total: {total} products</div>
    </>
  );
}
