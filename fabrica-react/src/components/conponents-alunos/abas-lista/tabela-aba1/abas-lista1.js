import "../css-abas-lista.css";
import { Link } from "react-router-dom";

// const abaAlunos = document.getElementById("ab1");
// const abaAguardando = document.getElementById("ab2");

function AbasLista1({ tipoAba }) {
  return (
    <div className="conteine-abas">
      <div id="aba">
        <Link to="/alunos" className="abas" id="ab1">
          Incritos
        </Link>
        <Link to="/alunos/nao-aprovado" className="abas">
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
