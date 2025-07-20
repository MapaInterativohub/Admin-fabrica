import "./css-lista-projetos.css";

function ListaProjetos() {
  return (
    <div className="listaProjetos">
      <h1>Projetos</h1>
      <div className="projetos">
        <img
          src="https://projetopromov.com.br/wp-content/uploads/2023/08/Profissoes-de-Tecnologia-em-2023-Projeto-Promov.jpg"
          alt="Img projeto"
        />
        <div className="descripiton">
          <h2>Titulo do Projeto</h2>
          <h3>Descrição do projeto</h3>
          <h3>categorioa</h3>
        </div>
        <div className="descripiton2">
          <h3>Data inicial</h3>
          <h3>Data final</h3>
          <button>Editar</button>
        </div>
      </div>
    </div>
  );
}

export default ListaProjetos;
