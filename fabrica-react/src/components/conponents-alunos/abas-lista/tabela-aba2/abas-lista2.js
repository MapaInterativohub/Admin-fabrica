import { useEffect, useState } from "react";
import "../css-abas-lista.css";
import { Link } from "react-router-dom";
import axios from "axios";

function AbasLista2() {
  const [alunos,setAlunos] = useState([])
  const getAlunos = ()=>{
    axios.get("http://localhost:8080/alunos/alunos").then((res)=>{
      const filtrados = res.data.filter((x) => x.status === false);
      setAlunos(filtrados)
    })
  }

  useEffect(()=>{
    getAlunos();
  },[])

  return (
    <div className="heder-tabela-aba">
      <div className="aba">
        <Link to="/alunos" className="abas" id="Ativo">
          <h1>Incritos</h1>
        </Link>
        <Link to="/alunos/nao-aprovado" className="abas">
          <h1 id="txt1">Aguardando</h1>
          <h1 id="txt2">{alunos.length}</h1>
        </Link>
      </div>
      <div className="label-adcionar-alunos">
        <Link to="/formulario/aluno">
          <i className="fa-solid fa-plus"></i> Adicionar Alunos
        </Link>
      </div>
    </div>
  );
}
export default AbasLista2;
