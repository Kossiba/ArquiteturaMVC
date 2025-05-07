import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login.jsx';
import Produtos from './views/Produtos.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/produtos" element={<Produtos />} />
    </Routes>
  );
}
