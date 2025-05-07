// src/views/Produtos.jsx
import React, { useEffect, useState } from 'react';
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
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="produtos-loading">Carregando produtos…</p>;
  }

  return (
    <div className="produtos-container">
      {produtos.map(p => (
        <div key={p.id} className="produto-card">
          <img
            src={p.imageUrl}
            alt={p.name}
            className="produto-imagem"
          />
          <h3 className="produto-nome">{p.name}</h3>
          <p className="produto-preco">R$ {p.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
