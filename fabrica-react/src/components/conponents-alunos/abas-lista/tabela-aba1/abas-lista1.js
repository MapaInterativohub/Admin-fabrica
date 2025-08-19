import "../css-abas-lista.css";
import { Link } from "react-router-dom";

// const abaAlunos = document.getElementById("ab1");
// const abaAguardando = document.getElementById("ab2");

function AbasLista1({ tipoAba }) {
  return (
    <div className="heder-tabela-aba">
      <div className="aba">
        <Link to="/alunos" className="abas" >
          <h1>Incritos</h1>
        </Link>

        <Link to="/alunos/nao-aprovado" className="abas" id="Ativo">
          <h1 className="txt">Aguardando</h1>
          <h1 className="txt">2</h1>
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
export default AbasLista1;
