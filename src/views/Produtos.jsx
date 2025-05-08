// src/views/Produtos.jsx
import React, { useEffect, useState } from 'react';
import { Link }                        from 'react-router-dom';
import { listProducts }                from '../controllers/productController.js';
import './Produtos.css';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const dados = await listProducts();
        setProdutos(dados);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="produtos-loading">Carregando…</p>;

  return (
    <div className="produtos-container">
      {produtos.map(p => (
        <div key={p.id} className="produto-card">
          <Link to={`/produtos/${p.id}`}>
            <img
              src={p.imageUrl}
              alt={p.name}
              className="produto-imagem"
            />
          </Link>
          <h3 className="produto-nome">{p.name}</h3>
          <p className="produto-preco">R$ {Number(p.price).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}