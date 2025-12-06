import React from 'react';
import ProductList from './components/ProductList';

export default function App() {
  return (
    <div className="app">
      <header className="header"><h1>Product Showcase</h1></header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}
