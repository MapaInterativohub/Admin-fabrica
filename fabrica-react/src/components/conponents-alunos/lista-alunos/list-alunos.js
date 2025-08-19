import "./css-lista-alunos.css"
import React, { useState, useEffect } from "react";
import axios from "axios";

function ListaAlunos() {
  const [aluno, setProjetos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/alunos/alunos")
      .then((res) => {
        setProjetos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos:", err);
      });
  }, []);

  return (
    <div className="listaAlunos">
      <h1>Alunos</h1>
      {aluno.map((aluno, index) => (
      <div className="alunos">
        <div className="info-aluno">
          <span>
            <i className="fa-solid fa-graduation-cap"></i> {aluno.nome} - {aluno.curso}
          </span>
          <div className="acoes">
            <span className="ra">(RA:{aluno.ra})</span>
            <button>Visualizar</button>
          </div>
        </div>
      </div>))}
    </div>
  );
}
export default ListaAlunos;
