import "./css-formulario-projetos.css"
function FormularioProjetos() {
    return (
        <div className="content">
            <h2>Cadastro de Projeto</h2>
            <form action="#" method="POST" enctype="multipart/form-data">

                <label for="nome">Nome do Projeto</label>
                <input type="text" id="nome" name="nome" required />

                <label for="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" required></textarea>

                <label for="curso">Curso Responsável</label>
                <input type="text" id="curso" name="curso" required />

                <label for="area">Área de Conhecimento</label>
                <input type="text" id="area" name="area" required />

                <div className="duplo">
                    <div>
                        <label for="dataInicio">Data de Início</label>
                        <input type="date" id="dataInicio" name="dataInicio" required />
                    </div>
                    <div>
                        <label for="dataFim">Data de Término</label>
                        <input type="date" id="dataFim" name="dataFim" required />
                    </div>
                </div>

                <label for="professor">Professor/Orientador</label>
                <input type="text" id="professor" name="professor" required />

                <label for="alunos">Alunos Participantes</label>
                <textarea id="alunos" name="alunos" placeholder="Separe por vírgula os nomes dos alunos"></textarea>

                <label for="repositorio">Link do Repositório (GitHub, etc)</label>
                <input type="url" id="repositorio" name="repositorio" />

                <label for="arquivo">Upload de Imagem ou Arquivo</label>
                <input type="file" id="arquivo" name="arquivo" accept=".png,.jpg,.jpeg,.pdf,.zip,.rar" />

                <button type="submit">Criar Projeto</button>
            </form>
        </div>
    );
}

export default FormularioProjetos;