import { useEffect, useState } from "react";
import "../formulario-gestores/css-formulario-criacao-gestores.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormularioGestores() {
  const retornoGestores = useNavigate();
  const [projetos, setProjetos] = useState([]);
  const [listaProjetos, setListaProjetos] = useState([]);

  const { codigoGestor } = useParams();
  const [gestor, setGestor] = useState({});

  // campos do formulário
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [descricao, setDescricao] = useState("");
  const [url, setUrl] = useState("");
  const [projeto, setProjeto] = useState(null);

  const [btnAddProjetos, setBtnAddProjetos] = useState(false);

  // Buscar gestor
  const getGestor = () => {
    axios
      .get(`http://localhost:8080/gestores/gestore/${codigoGestor}`)
      .then((res) => {
        setGestor(res.data);
      })
      .catch((err) => {
        console.error("Dados Não Encontrado", err);
      });
  };

  // Buscar projetos
  const getProjeto = () => {
    axios
      .get("http://localhost:8080/projetos/getprojetos")
      .then((res) => {
        setProjetos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Erro na busca dos Projetos", err);
      });
  };

  // Chama APIs
  useEffect(() => {
    if (codigoGestor) {
      getGestor();
    }
    getProjeto();
  }, [codigoGestor]);

  // Preenche os inputs com dados do gestor quando carregar
  useEffect(() => {
    if (gestor) {
      setNome(gestor.name || "");
      setCurso(gestor.cursoResposavel || "");
      setDescricao(gestor.descricao || "");
      setUrl(gestor.linkImagenGestor || "");
    }
  }, [gestor]);

  // Monta lista de projetos do gestor quando ambos (gestor + projetos) já tiverem carregado
  useEffect(() => {
    if (gestor?.projetos && projetos.length > 0) {
      const lista = gestor.projetos
        .map((codigo) => projetos.find((p) => p.codigoProjeto === codigo))
        .filter((p) => p); // remove nulls
      setListaProjetos(lista);
    }
  }, [gestor, projetos]);

  // abrir/fechar lista de projetos
  function abriAddFormularioA() {
    const c = document.getElementById("ListaProjetosJestores");

    if (!btnAddProjetos) {
      c.style.display = "block";
      setBtnAddProjetos(true);
      console.log("Abri");
    } else {
      c.style.display = "none";
      setBtnAddProjetos(false);
      console.log("Fechar");
    }
  }
  //PUT
  const putGestores = () => {
    const codigo = listaProjetos.flat().map((item) => item.codigoProjeto);
    const dados = {
      name: nome,
      descricao: descricao,
      cursoResposavel: curso,
      linkImagenGestor: url,
      projetos: codigo,
    };
    console.log(dados);
    axios
      .put(`http://localhost:8080/gestores/gestore/${codigoGestor}`, dados)
      .then((res) => console.log("Resposta:", res.data))
      .catch((err) => console.error("Erro:", err));

    retornoGestores("/gestores");
  };

  // POST
  const postGestores = () => {
    const dados = {
      name: nome,
      descricao: descricao,
      cursoResposavel: curso,
      linkImagenGestor: url,
      projetos: listaProjetos.map((projeto) => projeto.codigoProjeto),
    };
    axios
      .post("http://localhost:8080/gestores/addgestores", dados)
      .then((res) => console.log("Resposta:", res.data))
      .catch((err) => console.error("Erro:", err));

    retornoGestores("/gestores");
  };

  // Adicionar projeto na lista
  const addNovaListaProjetosGestor = (codigo) => {
    const projetoSelecionado = projetos.find((f) => f.codigoProjeto === codigo);
    if (
      projetoSelecionado &&
      !listaProjetos.some((p) => p.codigoProjeto === codigo)
    ) {
      setListaProjetos([...listaProjetos, projetoSelecionado]);
    }
  };

  // Remover projeto da lista
  const removeNovaLista = (codigo) => {
    const projetoSelecionadoRemovido = listaProjetos.filter(
      (f) => f.codigoProjeto !== codigo
    );
    setListaProjetos(projetoSelecionadoRemovido);
  };

  // desabilitar botões já selecionados
  useEffect(() => {
    projetos.forEach((desabilitar) => {
      const desativarBtn = document.getElementById(desabilitar.codigoProjeto);

      if (!desativarBtn) return;

      // Reset
      desativarBtn.disabled = false;
      desativarBtn.style.backgroundColor = "";
      desativarBtn.style.color = "";
      desativarBtn.style.cursor = "pointer";

      listaProjetos.forEach((item) => {
        if (desabilitar.codigoProjeto === item.codigoProjeto) {
          desativarBtn.disabled = true;
          desativarBtn.style.backgroundColor = "gray";
          desativarBtn.style.color = "white";
          desativarBtn.style.cursor = "not-allowed";
        }
      });
    });
  }, [listaProjetos, projetos]);

  return (
    <div className="content">
      <h2>Cadastro de Projeto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (codigoGestor) {
            putGestores();
          } else {
            postGestores();
          }
        }}
      >
        <label htmlFor="nome">Nome do Gestor</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
          name="nome"
          required
        />

        <label htmlFor="curso">Curso Responsável</label>
        <input
          type="text"
          id="curso"
          value={curso}
          onChange={(e) => {
            setCurso(e.target.value);
          }}
          name="curso"
          required
        />

        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => {
            setDescricao(e.target.value);
          }}
          name="descricao"
          required
        ></textarea>

        <div className="addMais">
          <label htmlFor="professor">Adicionar Projeto</label>
          <div className="textBtnAdicionar">
            <h2>Adicionar:</h2>
            <button
              alt="Adicionar"
              type="button"
              id="btnAddProjeto"
              onClick={(e) => {
                e.preventDefault();
                abriAddFormularioA();
              }}
            >
              <i id="icoG" className="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="listaDeItens" id="ListaProjetosJestores">
          {projetos.map((projeto, index) =>
            projeto ? (
              <button
                className="btnSelector"
                key={index}
                id={projeto.codigoProjeto}
                onClick={(e) => {
                  e.preventDefault();
                  addNovaListaProjetosGestor(projeto.codigoProjeto);
                }}
              >
                <h1>{projeto.nomeDoProjeto}</h1>
                <h1>Cod:{projeto.codigoProjeto}</h1>
              </button>
            ) : null
          )}
        </div>

        <div className="inputsLista">
          {listaProjetos.map((i) => (
            <div className="select" key={i.codigoProjeto}>
              <div className="TextSelect">
                <h1>{i.nomeDoProjeto}</h1>
                <h1>{i.codigoProjeto}</h1>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeNovaLista(i.codigoProjeto);
                }}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>

        <label htmlFor="url">URL Imagen</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          name="url"
          required
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default FormularioGestores;
