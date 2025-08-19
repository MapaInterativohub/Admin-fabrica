import "../formulario-gestores/css-formulario-criacao-gestores.css"

function FormularioGestores() {
    return (
        <div className="content">
            <h2>Cadastro de Projeto</h2>
            <form action="#" method="POST" enctype="multipart/form-data">
                <label for="nome">Nome do Gestor</label>
                <input type="text" id="nome" name="nome" required />

                <label for="curso">Curso Responsável</label>
                <input type="text" id="curso" name="curso" required />

                <label for="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" required></textarea>

                <label for="ImagenGestor">Imagen Gestor:</label>
                <div className="imgSelect" id="ImagenGestor">
                    <div className="Select">
                        <label htmlFor="sexo-m">
                            <img
                                src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg"
                                alt="img-1"
                            />
                        </label>
                        <input
                            type="radio"
                            id="sexo-m"
                            name="sexo"
                            value="Masculino"
                        />
                    </div>
                </div>

                <button type="submit">Salvar</button>
            </form>
        </div>
    )
}
export default FormularioGestores;