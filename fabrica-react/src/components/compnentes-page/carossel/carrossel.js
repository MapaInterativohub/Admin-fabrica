import "./css-carrossel.css";
import { register } from "swiper/element/bundle";
import React, { useState, useEffect } from "react";
import "swiper/css";
import axios from "axios";

// Registra os Web Components do Swiper
register();

//função para controle dos botoes
function AtulizarImagemCarrocel(codigo) {
  const formularioDeEnvioDeLink = document.getElementById("form" + codigo);
  const btnImagenCarrocel = document.getElementById("btn" + codigo);

  if (!formularioDeEnvioDeLink || !btnImagenCarrocel) {
    console.error("Elementos não encontrados.");
    return;
  }

  const estilo = window.getComputedStyle(formularioDeEnvioDeLink);
  const displayAtual = estilo.display;

  if (displayAtual === "none") {
    formularioDeEnvioDeLink.style.display = "flex";
    btnImagenCarrocel.innerHTML = "Cancelar";
  } else {
    formularioDeEnvioDeLink.style.display = "none";
    btnImagenCarrocel.innerHTML = "Editar";
  }
}

function AdicionarImagenNova() {
  const formularioDeEnvioDeLink = document.getElementById(
    "formularioSemImagen"
  );
  const btnImagenCarrocel = document.getElementById("btnSemImagen");

  if (!formularioDeEnvioDeLink || !btnImagenCarrocel) {
    console.error("Elementos não encontrados.");
    return;
  }

  const estilo = window.getComputedStyle(formularioDeEnvioDeLink);
  const displayAtual = estilo.display;

  if (displayAtual === "none") {
    formularioDeEnvioDeLink.style.display = "flex";
    btnImagenCarrocel.innerHTML = "Cancelar";
  } else {
    formularioDeEnvioDeLink.style.display = "none";
    btnImagenCarrocel.innerHTML = "Editar";
  }
}

function Carrossel() {
  const [mensagem, setMensagem] = useState();
  const [imagensCarrosel, setImagensCarrosel] = useState([]);
  //função para consumir as imagens da api

  const buscarImagens = async () => {
    const resposta = axios
      .get("http://localhost:8080/carrocel/carrocel_imagens")
      .then((res) => {
        setImagensCarrosel(res.data);
      })
      .catch((err) => {
        console.error("Erro na busca da imagen", err);
      });
  };

  useEffect(() => {
    buscarImagens();
  }, []);

  //função para atulizar as imagens
  const AtulizacaoDeImagem = async (codigoImagem) => {
    // Pega o valor do input dinamicamente
    const input = document.getElementById("imput" + codigoImagem);
    const novoLink = input.value;

    if (!novoLink.trim()) {
      setMensagem("Por Favor insira um link!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/carrocel/path/${codigoImagem}`,
        {
          linkImagenCarrocel: novoLink, // chave que sua API espera
        }
      );
    } catch (error) {
      console.error("Erro ao atualizar a imagem:", error);
      setMensagem("Erro ao atualizar a imagem.");
    }
  };

  const DeletarImagem = async (codigo) => {
    // Pega o valor do input dinamicamente
    try {
      const response = await axios.delete(
        `http://localhost:8080/carrocel/path/${codigo}`
      );
      setMensagem("Imagem deletada!");

      setImagensCarrosel((prevImagens) =>
        prevImagens.filter((img) => img.codigoImagem !== codigo)
      );
    } catch (error) {
      console.error("Erro ao atualizar a imagem:", error);
      setMensagem("Erro ao atualizar a imagem.");
    }
  };

  //função para adicionar nova imagem as imagens
  const [linkImagemNova, setLinkImagemNova] = useState();
  const [ativado, setAtivado] = useState(true);

  function verificarImagem(url) {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        // A imagem carregou com sucesso
        resolve(true);
      };

      img.onerror = () => {
        // A imagem não carregou (erro 404, url inválida, etc)
        resolve(false);
      };

      img.src = url;
    });
  }
  const AddNovaImagem = async () => {
    // Pega o valor do input dinamicamente
    const input = document.getElementById("input_imagem_nova");
    const novoLink = input.value;

    if (!novoLink.trim()) {
      setMensagem("Por Favor insira um link! ou um link valido");
      return;
    }
    verificarImagem("https://exemplo.com/minhaimagem.jpg").then((valida) => {
      if (!valida) {
        setMensagem("Por Favor insira um link! ou um link valido");
        return;
      }
    });

    setLinkImagemNova(novoLink); // atualiza o valor no estado
    const dados = {
      linkImagenCarrocel: novoLink,
      imagenAtivadaDesativada: ativado,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/carrocel/addimagen",
        dados // chave que sua API espera
      );
      input.value = "";

      await buscarImagens();
      setMensagem("Imagem atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a imagem:", error);
      setMensagem("Erro ao atualizar a imagem.");
    }
  };

  return (
    <div className="carrossel">
      <div className="heder-carrossel">
        <h1>Editar Imagens Carrossel</h1>
        <from className="quantidade-imagem-carrossel">
          <label>Quantidade de Imagens</label>
          <input type="number" id="quantidadeIMG" />
        </from>
      </div>
      <swiper-container
        slides-per-view="1"
        loop="true"
        autoplay="true"
        pagination="true"
        style={{ width: "100%", height: "300px" }} // exemplo de estilo direto
      >
        {imagensCarrosel.map((imagenCarrosel, index) => (
          <swiper-slide>
            <div className="btnAtulisarCarroselEforlario">
              <button
                className="btn-atualizar-txt"
                onClick={() =>
                  AtulizarImagemCarrocel(imagenCarrosel.codigoImagem)
                }
                id={"btn" + imagenCarrosel.codigoImagem}
              >
                Editar
              </button>
              <form
                id={"form" + imagenCarrosel.codigoImagem}
                className="FormAtulizarImgemCarrosel"
                onSubmit={(e) => {
                  e.preventDefault(); // impede o recarregamento da página
                  AtulizacaoDeImagem(imagenCarrosel.codigoImagem);
                }}
              >
                <div>
                  {" "}
                  <label
                    for="Input_Carrosel_Formulario"
                    id="Input_Carrosel_Formulario"
                  >
                    Texto de Apresentação:
                  </label>
                  <input
                    type="text"
                    id={"imput" + imagenCarrosel.codigoImagem}
                    name="Input_Carrosel_Formulario"
                    placeholder="Link Imagem"
                    defaultValue={imagenCarrosel.linkImagenCarrocel} // Corrigido
                  />
                </div>
                <button type="submit" className="btn-atualizar-txt">
                  Salvar
                </button>
                <button
                  className="btn-atualizar-txt"
                  onClick={() => {
                    DeletarImagem(imagenCarrosel.codigoImagem);
                  }}
                >
                  Deletar
                </button>
                <h1>{mensagem}</h1>
              </form>
            </div>
            <img src={imagenCarrosel.linkImagenCarrocel} alt="Praia 1" />
          </swiper-slide>
        ))}
        <swiper-slide className="CarrocelSemImagen">
          <h1>Sem Imagem</h1>
          <button
            onClick={() => {
              AdicionarImagenNova();
            }}
            id="btnSemImagen"
          >
            Adicionar Imagen
          </button>
          <form
            className="FormSemImagen"
            id="formularioSemImagen"
            onSubmit={(e) => {
              e.preventDefault(); // impede o recarregamento da página
              AddNovaImagem();
            }}
          >
            <label>Digite o link da Imagen</label>
            <input
              type="text"
              placeholder="link da Imagen"
              defaultValue={linkImagemNova}
              id="input_imagem_nova"
            />
            <button type="submit">Salvar</button>
          </form>
        </swiper-slide>
      </swiper-container>
    </div>
  );
}

export default Carrossel;
