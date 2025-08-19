import "./css-informacaodafabrica.css";
import { register } from "swiper/element/bundle";
import React, { useState, useEffect } from "react";
import "swiper/css";
import axios from "axios";

// Registra os Web Components do Swiper
register();

function InformacaoDaFabrica() {
  const codigoDeConfiguracaoTextoInicial = "CONF3212";
  const codigoDeConfiguracaoImagenInicial = "CONF1181";

  const [mensagem, setMensagem] = useState("");
  //função para pegar dados da configuração da api
  const [configuracoes, setConfiguracoes] = useState([]);

  const getConfig = async() =>{
    // e.preventDefault();
    axios
      .get("http://localhost:8080/config/config")
      .then((res) => {
        setConfiguracoes(res.data);
      })
      .catch((err) => {
        console.error("erro ao solicitar os dados", err);
      });
  }

  useEffect(() => {
    getConfig();
  }, []);

  const configMap = configuracoes.reduce((acc, item) => {
    acc[item.codigoDaConfguracao] = item.valorSalvo;
    return acc;
  }, {});

  //função para atualizar o texto de boas vindas
  const [Input_Descripton, setInput_Descripton] = useState("");
  const funcaoDeEnvioDeAtulizacaoTexto = async (e) => {
    e.preventDefault();
    if (!Input_Descripton.trim()) {
      setMensagem("Preencha todos os campos.");
      return; // interrompe o envio
    }

    try {
      const valorSalvo = Input_Descripton;
      const dados = { valorSalvo };
      const response = await axios.put(
        `http://localhost:8080/config/config/${codigoDeConfiguracaoTextoInicial}`,
        dados
      );
      getConfig()
    } catch (error) {
      console.error(error);
    }
  };

  const [Input_Imagem, setInput_Imagem] = useState("");
  const funcaoDeEnvioDeAtulizacaoImagen = async (e) => {
    e.preventDefault();

    if (!Input_Imagem.trim()) {
      setMensagem("Preencha todos os campos.");
      return; // interrompe o envio
    }

    try {
      const valorSalvo = Input_Imagem;
      const dados = { valorSalvo };
      const response = await axios.put(
        `http://localhost:8080/config/config/${codigoDeConfiguracaoImagenInicial}`,
        dados
      );
      getConfig()
    } catch (error) {
      console.error(error);
    }
  };

  //Função para abrir o conteiner para poder ser editado o texto.
  let stetBtnTextEditor = false;
  function EditarTexto() {
    const textDefinido = document.getElementById("Descripton");
    const inputText = document.getElementById("formularioDeAtulizacaoDeTexte");
    const btnCancelar = document.getElementById("btn-atualizar-txt");

    if (!stetBtnTextEditor) {
      textDefinido.style.display = "none";
      inputText.style.display = "block";
      btnCancelar.innerText = "Cancela";
      stetBtnTextEditor = true;
    } else {
      textDefinido.style.display = "block";
      inputText.style.display = "none";
      btnCancelar.innerText = "Editar";
      stetBtnTextEditor = false;
    }
  }
  //Função para abrir o conteiner para poder ser editado a imagen.
  let stetBtnImagenEditor = false;
  function EditarImagen() {
    const conteinerEditorImagen = document.getElementById("FormAtulizarImagen");
    const btnImagem = document.getElementById("btn-img");

    if (!stetBtnImagenEditor) {
      conteinerEditorImagen.style.display = "flex";
      btnImagem.innerHTML = "Cancelar";
      stetBtnImagenEditor = true;
    } else {
      conteinerEditorImagen.style.display = "none";
      btnImagem.innerHTML = "Editar Imagen";
      stetBtnImagenEditor = false;
    }
  }

  return (
    <div className="informacao">
      <div className="text">
        <div className="info-text">
          <h1>Fábrica de Software – Projeto Acadêmico</h1>
          <h2 id="Descripton">{configMap.CONF3212 || "Carregando texto..."}</h2> 
          <div
            className="formularioDeAtulizacaoDeTexte"
            id="formularioDeAtulizacaoDeTexte"
          >
            <form
              id="formularioDeTextoInicial"
              onSubmit={funcaoDeEnvioDeAtulizacaoTexto}
            >
              <label for="Input_Descripton">Texto de Apresentação:</label>
              <textarea
                id="Input_Descripton"
                name="Input_Descripton"
                rows="5"
                cols="40"
                value={Input_Descripton}
                onChange={(e) => setInput_Descripton(e.target.value)}
                placeholder={configMap.CONF3212} //codigo para a configuração do texto
              />
              <button
                type="submit"
                id="AtualizarText"
                className="btn-atualizar-txt"
              >
                Salvar
              </button>
              <h1>{mensagem}</h1>
            </form>
          </div>
        </div>
        <button
          className="btn-atualizar-txt"
          text="Editar"
          id="btn-atualizar-txt"
          onClick={() => EditarTexto()}
        >
          {" "}
          Editar
        </button>
      </div>
      <div className="Img-informacao-fabrica">
        <img
          src={
            configMap.CONF1181 || // codigo de configuração do Imagen
            "https://cdn-icons-png.flaticon.com/512/6705/6705142.png"
          }
          alt="Logo-Fabrica-de-sofWare"
        />
        <div className="EditorDeImagen">
          <button
            id="btn-img"
            className="btn-atualizar-txt"
            onClick={() => EditarImagen()}
          >
            Editar Imagem
          </button>
          <form
            id="FormAtulizarImagen"
            onSubmit={funcaoDeEnvioDeAtulizacaoImagen}
          >
            <div>
              {" "}
              <label for="Input_Imagem" id="Input_Imagem">
                Texto de Apresentação:
              </label>
              <input
                type="text"
                // id="Input_Imagem"
                name="Input_Imagem"
                placeholder="Link Imagem"
                value={Input_Imagem}
                onChange={(e) => setInput_Imagem(e.target.value)}
              />
            </div>
            <button
              type="submit"
              id="AtualizarTextImagen"
              className="btn-atualizar-txt"
            >
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InformacaoDaFabrica;
