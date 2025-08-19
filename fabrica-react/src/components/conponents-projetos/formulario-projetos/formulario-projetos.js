import "./css-formulario-projetos.css";
import react, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function FormularioProjetos() {
  const retornoProjetos = useNavigate()
  const [nomeFormularioProjetos, setDadosFormulario] = useState("");
  const [descricaoFormularioProjetos, setDescricaoFormularioProjetos] =
    useState("");
  const [areaDeComnhecimento, setAreaDeComnhecimento] = useState("");
  const [dataDeInicioDoProjeto, setDataDeInicioDoProjeto] = useState("");
  const [dataDoFimDoProjeto, setDataDoFimDoProjeto] = useState("");
  const [alunosParticipantesDoProjeto, setAlunosParticipantesDoProjeto] =
    useState("");
  const [profesorOrientador, setProfesorOrientador] = useState("");
  const [linkGit, setLinkGit] = useState("");
  const [linkImage, setLinkImage] = useState("");

  const CriarProjeto = async () => {
    const dados = {
      nomeDoProjeto: nomeFormularioProjetos,
      descricaoDoProjeto: descricaoFormularioProjetos,
      areaDeConhecimento: areaDeComnhecimento,
      dataDeInicioDoProjeto: dataDeInicioDoProjeto,
      dataDoFimDoProjeto: dataDoFimDoProjeto,
      alunosParticipantesDoProjeto: alunosParticipantesDoProjeto,
      profesorOrientador: profesorOrientador,
      linkGit: linkGit,
      linkImage: linkImage,
    };

    try {
      axios.post("http://localhost:8080/projetos/addprojetos",dados);
      console.log(dados);
      retornoProjetos("/projetos")

    } catch (error) {
      console.log("erro");
    }
  };
  const [imagensCurso, setImagensCurso] = useState([]);
  const getImagesCursos = async () => {
    await axios
      .get("http://localhost:8080/imagemcurso/imagemcurso")
      .then((res) => {
        setImagensCurso(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Erro na busca da imagen", err);
      });
  };
  useEffect(() => {
    getImagesCursos();
  }, []);

  return (
    <div className="content">
      <h2>Cadastro de Projeto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // impede o recarregamento da página
          CriarProjeto();
        }}
      >
        <label for="nome">Nome do Projeto</label>
        <input
          type="text"
          defaultValue={nomeFormularioProjetos}
          onChange={(e) => setDadosFormulario(e.target.value)}
          id="nome"
          name="nome"
          required
        />

        <label for="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          defaultValue={descricaoFormularioProjetos}
          onChange={(e) => setDescricaoFormularioProjetos(e.target.value)}
          required
        ></textarea>

        <label for="area">Área de Conhecimento</label>
        <input
          type="text"
          id="area"
          defaultValue={areaDeComnhecimento}
          onChange={(e) => setAreaDeComnhecimento(e.target.value)}
          name="area"
          required
        />

        <div className="duplo">
          <div>
            <label for="dataInicio">Data de Início</label>
            <input
              type="date"
              id="dataInicio"
              defaultValue={dataDeInicioDoProjeto}
              onChange={(e) => setDataDeInicioDoProjeto(e.target.value)}
              name="dataInicio"
              required
            />
          </div>
          <div>
            <label for="dataFim">Data de Término</label>
            <input
              type="date"
              id="dataFim"
              defaultValue={dataDoFimDoProjeto}
              onChange={(e) => setDataDoFimDoProjeto(e.target.value)}
              name="dataFim"
              required
            />
          </div>
        </div>

        <label for="professor">Professor/Orientador</label>
        <input
          type="text"
          id="professor"
          defaultValue={profesorOrientador}
          onChange={(e) => setProfesorOrientador(e.target.value)}
          name="professor"
          required
        />

        <label for="alunos">Alunos Participantes</label>
        <textarea
          id="alunos"
          name="alunos"
          placeholder="Separe por vírgula os nomes dos alunos"
          defaultValue={alunosParticipantesDoProjeto}
          onChange={(e) => setAlunosParticipantesDoProjeto(e.target.value)}
        ></textarea>

        <label for="repositorio">Link do Repositório (GitHub, etc)</label>
        <input
          type="url"
          id="repositorio"
          defaultValue={linkGit}
          onChange={(e) => setLinkGit(e.target.value)}
          name="repositorio"
        />
        <label for="Imagens Curso">Imagens Inicial</label>
        <div className="imgSelect" id="Imagens Curso">
          {imagensCurso.map((imagensCurso,index)=> (
          <div className="Select">
            <label for={imagensCurso.codigoImagem}>
              <img
                src={imagensCurso.linkImagemCurso}
                alt={imagensCurso.altImagem}
              />
            </label>
            <input
              type="radio"
              id={imagensCurso.codigoImagem}
              name="imagensCursos"
              defaultValue={imagensCurso.linkImagemCurso}
              onChange={(e) => setLinkImage(e.target.value)}
            />
          </div>))}
        </div>

        <button type="submit">Criar Projeto</button>
      </form>
    </div>
  );
}

export default FormularioProjetos;
