import "./css-lista-alunos.css"

function ListaAlunos() {
  return (
    <div className="listaAlunos">
      <h1>Alunos</h1>
      <div className="alunos">
        <div className="info-aluno">
          <span>
            <i className="fa-solid fa-graduation-cap"></i> Nome do Aluno - Curso
          </span>
          <div className="acoes">
            <span className="ra">(RA)</span>
            <button>Visualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListaAlunos;
