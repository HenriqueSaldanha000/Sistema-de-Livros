import React, { useState, useEffect } from "react";

function App() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    fetch("http://localhost:5176/api/livros")
      .then((res) => res.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error("Erro ao buscar livros:", err));
  }, []);

  const adicionarLivro = () => {
    if (!titulo.trim() || !autor.trim()) return;

    fetch("http://localhost:5176/api/livros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, autor }),
    })
      .then((res) => res.json())
      .then((novoLivro) => {
        setLivros([...livros, novoLivro]);
        setTitulo("");
        setAutor("");
      })
      .catch((err) => console.error("Erro ao adicionar livro:", err));
  };

  const removerLivro = (id) => {
    fetch(`http://localhost:5176/api/livros/${id}`, { method: "DELETE" })
      .then(() => setLivros(livros.filter((livro) => livro.id !== id)))
      .catch((err) => console.error("Erro ao remover livro:", err));
  };

  return (
    <div style={estilos.container}>
      <h1 style={estilos.titulo}>Sistema de Livros</h1>
      <div style={estilos.formulario}>
        <input
          type="text"
          placeholder="Título do livro"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={estilos.input}
        />
        <input
          type="text"
          placeholder="Autor do livro"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={estilos.input}
        />
        <button onClick={adicionarLivro} style={estilos.botao}>
          Adicionar
        </button>
      </div>

      <ul style={estilos.lista}>
        {livros.map((livro) => (
          <li key={livro.id} style={estilos.item}>
            <div>
              <strong>{livro.titulo}</strong>
              <div style={{ fontSize: "14px", color: "#555" }}>
                Autor: {livro.autor}
              </div>
            </div>
            <button
              onClick={() => removerLivro(livro.id)}
              style={estilos.botaoRemover}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const estilos = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "40px",
  },
  titulo: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  formulario: {
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    width: "200px",
    fontSize: "16px",
    marginRight: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  botao: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  lista: {
    listStyle: "none",
    padding: 0,
    maxWidth: "500px",
    margin: "0 auto",
  },
  item: {
    backgroundColor: "#f9f9f9",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  botaoRemover: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;