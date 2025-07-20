import "../css-abas-lista.css";
import { Link } from "react-router-dom";

function AbasLista2({ tipoAba }) {
  return (
    <div className="conteine-abas">
      <div id="aba">
        <Link to="/alunos" className="abas">
          Incritos
        </Link>
        <Link to="/alunos/nao-aprovado" className="abas" id="ab1">
          <h1 id="txt1">Aguardando</h1>
          <h1 id="txt2">2</h1>
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
