import "./css-formulario-alunos.css";

function FormularioAlunos() {
  return (
    <div className="content">
      <h2>Cadastro de Aluno</h2>
      <form action="#" method="POST" enctype="multipart/form-data">
        <label for="nome">Nome do Aluno</label>
        <input type="text" id="nome" name="nome" required />

        <label for="curso">Curso</label>
        <input type="text" id="curso" name="curso" required/>

        <label for="periodo">Periodo</label>
        <input type="text" id="periodo" name="periodo" required />

        <label for="ra">RA</label>
        <input type="text" id="ra" name="ra" required />

        <label for="estado">Projeto</label>
        <select id="estado" name="estado">
          <option value="projeto1">Projeto 1</option>
          <option value="projeto2">Projeto 2</option>
          <option value="projeto3">Projeto 3</option>
        </select>

        <button type="submit">Criar Projeto</button>
      </form>
    </div>
  );
}
export default FormularioAlunos;
