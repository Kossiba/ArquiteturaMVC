// src/views/ProdutoDetalhe.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link }            from 'react-router-dom';
import { getProductById }             from '../controllers/productController.js';
import './ProdutoDetalhe.css';

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const [prod, setProd]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductById(id);
        setProd(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Carregando produto…</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="detalhe-container">
      <Link to="/produtos" className="back-link">← Voltar</Link>
      <div className="detalhe-card">
        <img
          src={prod.imageUrl}
          alt={prod.name}
          className="detalhe-imagem"
        />
        <div className="detalhe-info">
          <h2>{prod.name}</h2>
          <p className="detalhe-preco">R$ {Number(prod.price).toFixed(2)}</p>
          <p className="detalhe-date">
            Criado em: {new Date(prod.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}