import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Livros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5176/api/livros')
      .then(response => {
        setLivros(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar livros:", error);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Livros</h2>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>{livro.titulo} - {livro.autor}</li>
        ))}
      </ul>
    </div>
  );
}

export default Livros;