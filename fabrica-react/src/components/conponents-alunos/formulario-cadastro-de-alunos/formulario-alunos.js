import axios from "axios";
import "./css-formulario-alunos.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function FormularioAlunos() {

  const [listaDeProjetos, setListaDeProjetos] = useState([]); //dados para selecionar projeto para envio no post e para o put

  //dados para post
  const [ra, setRa] = useState("");
  const [emailInstitucional, setEmailInstitucional] = useState("");
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [projetoSelecionado, setProjetoSelecionado] = useState("");
  const [motivoDaInscricao, setMotivoDaInscricao] = useState("");


  const { ras } = useParams();
  const [aluno, setAluno] = useState([]);
  const [projetosParaAtulizacao, setProjetosParaAtulizacao] = useState([]);

  const getAluno = async () => {
    await axios.get(`http://localhost:8080/alunos/aluno/${ras}`).then((res) => {
      setAluno(res.data)
      // console.log(res.data)
    }).catch((err) => {
      console.error("erro na busca do aluno", err)
    })
  }

  const getProjeto = async () => {
    await axios.get(`http://localhost:8080/projetos/getprojetos/${aluno.projetoSelecionado}`).then((res) => {
      setProjetosParaAtulizacao(res.data)
      console.log("fff",res.data)
    }).catch((err) => {
      console.error("erro na busca do projeto para Atulização", err)
    })
  }


  const getProjetos = async () => {
    await axios
      .get("http://localhost:8080/projetos/getprojetos")
      .then((res) => {
        setListaDeProjetos(res.data);
      })
      .catch((err) => {
        console.error("erro na busca dos projetos", err);
      });
  };

  const retornoPageAlunos = useNavigate();

  const postProjetos = async () => {
    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, "0");       // garante 2 dígitos
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");  // mês começa em 0
    const ano = hoje.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`;
    const dados = {
      "ra": ra,
      "emailInstitucional": emailInstitucional,
      "nome": nome,
      "curso": curso,
      "projetoSelecionado": projetoSelecionado,
      "motivoDaInscricao": motivoDaInscricao,
      "dataInscricao": dataFormatada
    }
    try {
      axios.post("http://localhost:8080/alunos/addalunos", dados)
    } catch {
      console.error("Envio falhou")
    }

    retornoPageAlunos("/alunos")
  }

  useEffect(() => {
    getProjetos();

    if (ras !== undefined) {
      getAluno();

    }
  }, []);

  useEffect(() => {
    if (aluno && listaDeProjetos.length > 0) {
      console.log("Aluno:", aluno);
      console.log("Projetos:", listaDeProjetos);

      const existeProjeto = listaDeProjetos.some(
        (proj) => proj.codigoProjeto === aluno.projetoSelecionado
      );
      console.log("Projeto do aluno existe?", existeProjeto);

      if (existeProjeto) {
        const removerItem = () => {
          setListaDeProjetos(listaDeProjetos.filter((item) => item.codigoProjeto !== aluno.projetoSelecionado));
        };
        removerItem();
      }

      console.log("Projetos AAT:", listaDeProjetos);
      getProjeto();
    }
  }, []);


  return (
    <div className="content">
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={(e) => { e.preventDefault(); postProjetos(); }}>
        <label for="ra">RA</label>
        <input type="number" id="ra" name="ra" value={aluno.ra} defaultValue={ra} onChange={(e) => { setRa(e.target.value) }} required />

        <label for="email">E-mail (institucional)</label>
        <input type="email" id="email" name="email" value={aluno.emailInstitucional} defaultValue={emailInstitucional} onChange={(e) => { setEmailInstitucional(e.target.value) }} required />

        <label for="nome">Nome do Aluno</label>
        <input type="text" id="nome" name="nome" value={aluno.nome} defaultValue={nome} onChange={(e) => { setNome(e.target.value) }} required />

        <label for="curso">Curso</label>
        <input type="text" id="curso" name="curso" value={aluno.curso} defaultValue={curso} onChange={(e) => { setCurso(e.target.value) }} required />

        <label for="motivo">Motivo da Inscrição ?</label>
        <textarea type="text" id="motivo" name="motivo" value={aluno.motivoDaInscricao} defaultValue={motivoDaInscricao} onChange={(e) => { setMotivoDaInscricao(e.target.value) }} required />
        <label htmlFor="projeto">Projeto</label>
        <select
          id="projeto"
          name="projeto"
          value={projetoSelecionado}   // valor controlado pelo estado
          onChange={(e) => setProjetoSelecionado(e.target.value)
          }
        >
          <option value={projetosParaAtulizacao.codigoProjeto}>{projetosParaAtulizacao.nomeDoProjeto}</option>
          {listaDeProjetos.map((projeto, index) => (
            <option key={index} value={projeto.codigoProjeto}>
              Nome: {projeto.nomeDoProjeto}
            </option>
          ))}
        </select>

        <button type="submit">Criar Projeto</button>
      </form>
    </div>
  );
}
export default FormularioAlunos;
