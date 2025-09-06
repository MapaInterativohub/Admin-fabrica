import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItenGestor from "../ComponenteAdicionadoFormulario/itenGestor";

function EditaFormulario() {
  const { codigoProjeto } = useParams();
  const [dadosProjeto, setDadosProjeto] = useState([]);
  const [dadosGestores, setDadosGestores] = useState([]);
  const [dadosAlunos, setDadosAlunos] = useState([]);

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

  useEffect(() => {
    getProjeto();
  }, []);

  useEffect(() => {
    if (dadosProjeto.profesorOrientador) {
      getGestor();
    }
    if (dadosProjeto.alunosParticipantesDoProjeto) {
      getAlunos();
    }
  }, [dadosProjeto]);

  const getGestor = async () => {
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

  const getAlunos = async () => {
    let codigoAlunos = dadosProjeto.alunosParticipantesDoProjeto;

    const alunos = [];

    for (let g of codigoAlunos) {
      console.log(g);
      const res = await axios.get(`http://localhost:8080/alunos/aluno/${g}`);
      alunos.push(res.data);
    }
    setDadosAlunos(alunos);
  };

  function removerGestor() {}

  function removerAluno() {}

  return (
    <div className="content">
      <h2>Cadastro de Projeto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // impede o recarregamento da página
        }}
      >
        <label for="nome">Nome do Projeto</label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          value={dadosProjeto.nomeDoProjeto}
        />

        <label for="descricao">Descrição</label>
        <textarea
          id="descricao"
          name="descricao"
          required
          value={dadosProjeto.descricaoDoProjeto}
        ></textarea>

        <label for="area">Área de Conhecimento</label>
        <input
          type="text"
          id="area"
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
            <button alt="Adicionar" type="button" id="btnAddGestor">
              <i id="icoG" class="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>

        <div className="listaDeItens" id="EditelistaGestores">
          <div className="txt">
            <h2>Nome:</h2>
            <h2>COD:</h2>
          </div>
          <i class="fa-regular fa-plus"></i>
        </div>
        <div className="inputsLista">
          <div>
            {dadosGestores.map((g, index) => (
              <ItenGestor
                key={index}
                name={g.name}
                codigoGestor={g.codigoGestor}
                onRemoveA={() => removerGestor(g.codigoGestor)}
              />
            ))}
          </div>
        </div>

        <div className="addMais">
          <label for="professor">Alunos Participantes</label>
          <div className="textBtnAdicionar">
            <h2>Adicionar:</h2>
            <button alt="Adicionar" type="button" id="btnAddAlunos">
              <i id="icoA" class="fa-regular fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="listaDeItens" id="listaAlunos">
          <div className="itens">
            <div className="txt">
              <h2>Nome:</h2>
              <h2>RA:</h2>
            </div>
            <i className="fa-regular fa-plus"></i>
          </div>
        </div>
        <div className="inputsLista" id="addAlunos">
          {dadosAlunos.map((a, index) => (
            <ItenGestor
              key={index}
              name={a.nome}
              codigoGestor={a.ra}
              onRemoveA={() => removerAluno(a.ra)}
            />
          ))}
        </div>

        <label for="repositorio">Link do Repositório (GitHub, etc)</label>
        <input type="url" id="repositorio" name="repositorio" />
        <label for="Imagens Curso">Imagens Inicial</label>
        <div className="imgSelect" id="Imagens Curso">
          <div className="Select">
            <label>
              <img />
            </label>
            <input type="radio" name="imagensCursos" />
          </div>
        </div>

        <button type="submit">Criar Projeto</button>
      </form>
    </div>
  );
}

export default EditaFormulario;
