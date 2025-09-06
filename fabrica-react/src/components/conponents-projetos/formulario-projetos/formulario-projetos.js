import "./css-formulario-projetos.css";
import Iten from "./ComponenteAdicionadoFormulario/iten";
import ItenGestor from "./ComponenteAdicionadoFormulario/itenGestor"
import react, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


let btnAluno = false;
let btnGestor = false;
function FormularioProjetos() {
  const { codigoProjeto } = useParams();

  const [dadosProjeto, setDadosProjeto] = useState([]);
  const [dadosGestores, setDadosGestores] = useState([]);
  const [dadosAlunos, setDadosAlunos] = useState([]);

  useEffect(() => {
    if (codigoProjeto) {
      getProjeto();
    }
  }, [codigoProjeto]);
  
  // busca gestores e alunos quando dadosProjeto é carregado
  useEffect(() => {
    if (dadosProjeto.profesorOrientador) {
      getGestorL();
    }
    if (dadosProjeto.alunosParticipantesDoProjeto) {
      getAlunosL();
    }
  }, [dadosProjeto]);

  const getProjeto = async () => {
    await axios
      .get(`http://localhost:8080/projetos/getprojetos/${codigoProjeto}`)
      .then((res) => {
        setDadosProjeto(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Erro na busca da imagen", err);
      });
  };



  const getGestorL = async () => {
    let codigoGestores = dadosProjeto.profesorOrientador;

    const listaGestores = [];

    for (let g of codigoGestores) {
      console.log(g);
      const res = await axios.get(
        `http://localhost:8080/gestores/gestore/${g}`
      );
      listaGestores.push(res.data);
    }
    setDadosGestores(listaGestores);
  };

  const getAlunosL = async () => {
    let codigoAlunos = dadosProjeto.alunosParticipantesDoProjeto;

    const alunos = [];

    for (let g of codigoAlunos) {
      console.log(g);
      const res = await axios.get(`http://localhost:8080/alunos/aluno/${g}`);
      alunos.push(res.data);
    }
    setDadosAlunos(alunos);
  };

  const retornoProjetos = useNavigate()
  const [nomeFormularioProjetos, setDadosFormulario] = useState("");
  const [descricaoFormularioProjetos, setDescricaoFormularioProjetos] =
    useState("");
  const [areaDeComnhecimento, setAreaDeComnhecimento] = useState("");
  const [dataDeInicioDoProjeto, setDataDeInicioDoProjeto] = useState("");
  const [dataDoFimDoProjeto, setDataDoFimDoProjeto] = useState("");
  const [linkGit, setLinkGit] = useState("");
  const [linkImage, setLinkImage] = useState(dadosProjeto.linkImage || "");

  // const [linkImage, setLinkImage] = useState(dadosProjeto.linkImage || "");

  function abriAddFormularioA(idConteiner) {
    const c = document.getElementById(idConteiner);

    if (!btnAluno) {
      c.style.display = "block";
      btnAluno = true;
      console.log("aberto")
    } else {
      c.style.display = "none";
      btnAluno = false;
      console.log("fechado")
    }
  }

  function abriAddFormularioG(idConteiner) {
    const c = document.getElementById(idConteiner);

    if (!btnGestor) {
      c.style.display = "block";
      btnGestor = true;
      console.log("aberto")
    } else {
      c.style.display = "none";
      btnGestor = false;
      console.log("fechado")
    }
  }

  const [alunosAdicionados, setAlunosAdicionados] = useState([]);

  function addAlunos(aluno) {
    // adiciona apenas se ainda não estiver na lista
    setAlunosAdicionados(prev => {
      if (!prev.some(a => a.ra === aluno.ra)) {
        return [...prev, aluno];
      }
      return prev;
    });
  }

  function removerAluno(ra) {
    setAlunosAdicionados(prev => prev.filter(aluno => aluno.ra !== ra));
  }

  const [gestoresAdicionados, setGestoresAdicionados] = useState([]);

  function addGestores(gestor) {
    // adiciona apenas se ainda não estiver na lista
    setGestoresAdicionados(prev => {
      if (!prev.some(g => g.ra === gestor.codigoGestor)) {
        return [...prev, gestor];
      }
      return prev;
    });
  }

  function removerGestor(codigoGestor) {
    setGestoresAdicionados(prev => prev.filter(gestor => gestor.codigoGestor !== codigoGestor));
    console.log("Entro")
  }


  const CriarProjeto = async () => {
    const apenasRAs = alunosAdicionados.map(alunoRa => alunoRa.ra);
    const apenasCodigosGestores = gestoresAdicionados.map(codigo => codigo.codigoGestor);

    

    const dados = {
      nomeDoProjeto: nomeFormularioProjetos,
      descricaoDoProjeto: descricaoFormularioProjetos,
      areaDeConhecimento: areaDeComnhecimento,
      dataDeInicioDoProjeto: dataDeInicioDoProjeto,
      dataDoFimDoProjeto: dataDoFimDoProjeto,
      alunosParticipantesDoProjeto: apenasRAs,
      profesorOrientador: apenasCodigosGestores,
      linkGit: linkGit,
      linkImage: linkImage,
    };

    try {
      axios.post("http://localhost:8080/projetos/addprojetos", dados);
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
      })
      .catch((err) => {
        console.error("Erro na busca da imagen", err);
      });
  };
  useEffect(() => {
    getImagesCursos();
  }, []);

  const [aluno, setAlunos] = useState([]);
  const getAlunos = async () => {
    await axios.get("http://localhost:8080/alunos/alunos").then((res) => {
      setAlunos(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.error(err, "Erro ao Buscar Lista de aluno")
    })
  }
  useEffect(() => {
    getAlunos();
  }, []);

  const [gestores, setGestores] = useState([]);
  const getGestores = async () => {
    await axios.get("http://localhost:8080/gestores/gestores").then((res) => {
      setGestores(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.error(err, "Erro ao Buscar Lista de aluno")
    })
  }
  useEffect(() => {
    getGestores();
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
          value={dadosProjeto.nomeDoProjeto}
        />

        <label for="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          defaultValue={descricaoFormularioProjetos}
          onChange={(e) => setDescricaoFormularioProjetos(e.target.value)}
          required
          value={dadosProjeto.descricaoDoProjeto}
        ></textarea>

        <label for="area">Área de Conhecimento</label>
        <input
          type="text"
          id="area"
          defaultValue={areaDeComnhecimento}
          onChange={(e) => setAreaDeComnhecimento(e.target.value)}
          name="area"
          required
          value={dadosProjeto.areaDeConhecimento}
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
              value={dadosProjeto.dataDeInicioDoProjeto}
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
              value={dadosProjeto.dataDoFimDoProjeto}
            />
          </div>
        </div>

        <div className="addMais">
          <label for="professor">Professor/Orientador</label>
          <div className="textBtnAdicionar">
            <h2>Adicionar:</h2>
            <button alt="Adicionar" type="button" id="btnAddGestor" onClick={() => { abriAddFormularioG("listaGestores") }}><i id="icoG" class="fa-regular fa-plus"></i></button>
          </div>
        </div>
        <div className="listaDeItens" id="listaGestores">
          {gestores.map((g, index) => {
            const jaAdicionadoG = gestoresAdicionados.some(gl => gl.codigoGestor === g.codigoGestor);

            return (
              <div className="itens" id={g.codigoGestor}
                key={g.codigoGestor}
                onClick={() => !jaAdicionadoG && addGestores(g)}
                style={{
                  pointerEvents: jaAdicionadoG ? 'none' : 'auto',
                  opacity: jaAdicionadoG ? 0.6 : 1,
                  background: jaAdicionadoG ? '#9a3535ff' : 'transparent'
                }}>
                <div className="txt">
                  <h2>Nome:{g.name}</h2>
                  <h2>COD:{g.codigoGestor}</h2>
                </div>
                <i class="fa-regular fa-plus"></i>
              </div>
            )
          })
          }
        </div>
        <div className="inputsLista">
          <div>
            {gestoresAdicionados.map((gestor, index) => (
              <ItenGestor key={index} name={gestor.name} codigoGestor={gestor.codigoGestor} onRemoveA={() => removerGestor(gestor.codigoGestor)} />
            ))}
            {dadosGestores.map((gestor, index) => (
              <ItenGestor key={index} name={gestor.name} codigoGestor={gestor.codigoGestor} onRemoveA={() => removerGestor(gestor.codigoGestor)} />
            ))}
          </div>
        </div>

        <div className="addMais">
          <label for="professor">Alunos Participantes</label>
          <div className="textBtnAdicionar">
            <h2>Adicionar:</h2>
            <button alt="Adicionar" type="button" id="btnAddAlunos" onClick={() => { abriAddFormularioA("listaAlunos") }}><i id="icoA" class="fa-regular fa-plus"></i></button>
          </div>
        </div>
        <div className="listaDeItens" id="listaAlunos">
          {aluno.map((a) => {
            const jaAdicionado = alunosAdicionados.some(al => al.ra === a.ra);

            return (
              a.projetoSelecionado == null && (
                <div
                  key={a.ra}
                  className="itens"
                  onClick={() => !jaAdicionado && addAlunos(a)}
                  style={{
                    pointerEvents: jaAdicionado ? 'none' : 'auto',
                    opacity: jaAdicionado ? 0.6 : 1,
                    background: jaAdicionado ? '#9a3535ff' : 'transparent'
                  }}
                >
                  <div className="txt">
                    <h2>Nome: {a.nome}</h2>
                    <h2>RA: {a.ra}</h2>
                  </div>
                  <i className="fa-regular fa-plus"></i>
                </div>
              )
            );
          })}
        </div>
        <div className="inputsLista" id="addAlunos">
          {alunosAdicionados.map((aluno, index) => (
            <Iten key={index} nome={aluno.nome} ra={aluno.ra} onRemove={() => removerAluno(aluno.ra)} />
          ))}
          {dadosAlunos.map((aluno, index) => (
            <Iten key={index} nome={aluno.nome} ra={aluno.ra} onRemove={() => removerAluno(aluno.ra)} />
          ))}
        </div>


        <label for="repositorio">Link do Repositório (GitHub, etc)</label>
        <input
          type="url"
          id="repositorio"
          defaultValue={linkGit}
          onChange={(e) => setLinkGit(e.target.value)}
          name="repositorio"
          value={dadosProjeto.linkGit}
        />
        <label for="Imagens Curso">Imagens Inicial</label>
        <div className="imgSelect" id="Imagens Curso">
          {imagensCurso.map((imagensCurso, index) => (
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
                value={imagensCurso.linkImagemCurso}
                
                checked={linkImage === imagensCurso.linkImagemCurso}
              />
            </div>))}
        </div>

        <button type="submit">Criar Projeto</button>
      </form>
    </div>
  );
}

export default FormularioProjetos;
