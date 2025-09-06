import "./css-lista-projetos.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ListaProjetos() {
  const [projetos, setProjetos] = useState([]);
  const getProjetos = ()=>{
    axios
    .get("http://localhost:8080/projetos/getprojetos")
    .then((res) => {
      setProjetos(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Erro ao buscar projetos:", err);
    });
  }

  useEffect(() => {
    getProjetos();
  }, []);

  return (
    <div className="listaProjetos">
      <h1>Projetos</h1>
      <ul>
        {projetos.map((projeto, index) => (
          <div
            className="projetos"
            key={projeto.codigoProjeto}
            id={projeto.codigoProjeto}
          >
            <img src={projeto.linkImage} alt={projeto.codigoProjeto} />
            <div className="descripiton">
              <h2>{projeto.nomeDoProjeto}</h2>
              <h3>{projeto.descricaoDoProjeto}</h3>
              <h3>{projeto.areaDeConhecimento}</h3>
            </div>
            <div className="descripiton2">
              <h3>Data inicial:{projeto.dataDeInicioDoProjeto}</h3>
              <h3>Data final:{projeto.dataDoFimDoProjeto}</h3>
              <Link to={`/projetos/formulario/${projeto.codigoProjeto}`}>
                <button>Editar</button>
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ListaProjetos;
