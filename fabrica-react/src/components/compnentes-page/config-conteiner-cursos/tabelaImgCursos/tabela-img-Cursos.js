import "./css-tabela-img-cursos.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TabelaImgCursos() {
  // Requisição das imagens do bando de dados para manipulação e uso no site;
  const [imagens, setImagens] = useState([]);
  let stadoCanpoDeTexto = false;

  const getImagens = async() => {
    axios
      .get("http://localhost:8080/imagemcurso/imagemcurso")
      .then((res) => {
        setImagens(res.data)
      })
      .catch((err) => {
        console.error("Erro ao buscar os dados", err);
      });
  };

  useEffect(() => {
    getImagens();
  }, []);

  // função para Deletar Imagen
  function DeletImagen(id) {
    const confirmar = window.confirm("Tem certeza que deseja deletar esta imagem?");
    if (!confirmar) return;

    axios.delete(`http://localhost:8080/imagemcurso/imagemcurso/${id}`)
      .then(response => {
        console.log('Item deletado com sucesso!');
        setImagens((prevImagens) =>
          prevImagens.filter((img) => img.codigoImagem !== id)
        );
      })
      .catch(error => {
        console.error('Erro ao deletar item:', error);
      });
  }
  // função para adcionar mais uma imagem 

  const [altImagem, setNomeDaImagem] = useState('')
  const [linkImagemCurso, setLinkDaImagem] = useState('')
  const [mensagem, setMensagem] = useState('');

  const FormularioDeEnvioDeImages = async (e) => {
    e.preventDefault();

    if (!altImagem.trim() || !linkImagemCurso.trim()) {
      setMensagem('Preencha todos os campos.');
      return; // interrompe o envio
    }
    try {
      const dados = { altImagem, linkImagemCurso };
      const response = await axios.post("http://localhost:8080/imagemcurso/imagemcurso", dados)

      setMensagem("Imagens Enviada");
      setNomeDaImagem('');
      setLinkDaImagem('');
      getImagens();
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao enviar o formulário.');
    }

  };

  //função de controle de abertura de conteiner para envio das imagens
  function AdicionarImagem() {
    const abriCampoDeFomularioParaEnvioDeDados = document.getElementById("formulatioDeEnvioDeImagemCurso");
    const botaoAbriCanpoDeEnvio = document.getElementById("btnAdicionarImgCurso");

    if (!stadoCanpoDeTexto) {
      abriCampoDeFomularioParaEnvioDeDados.style.display = "block";
      botaoAbriCanpoDeEnvio.innerText = "Cancela";
      stadoCanpoDeTexto = true;
    } else {
      abriCampoDeFomularioParaEnvioDeDados.style.display = "none";
      botaoAbriCanpoDeEnvio.innerText = "Adicionar";
      setNomeDaImagem('');
      setLinkDaImagem('');
      stadoCanpoDeTexto = false;
    }
  }


  return (
    <div className="tabelaImg">
      <div className="haderConteinerImagens">
        <h1>Categoria Cursos</h1>
        <button id="btnAdicionarImgCurso" onClick={() => AdicionarImagem()}>Adicionar</button>
      </div>

      <div className="formImagensCurso" id="formulatioDeEnvioDeImagemCurso">
        <form onSubmit={FormularioDeEnvioDeImages}>
          <div className="itensSave">
            <label>Nome do Curso:
              <input
                type="text"
                id="altImagem"
                value={altImagem}
                onChange={(e) => setNomeDaImagem(e.target.value)}
              />
            </label>

            <label>Link Imagem:
              <input
                type="text"
                id="linkImagemCurso"
                value={linkImagemCurso}
                onChange={(e) => setLinkDaImagem(e.target.value)}
              />
            </label>
          </div>
          <div className="btnEnvio">
            <button type="submit" className="save">Salvar</button>
            <h1>{mensagem}</h1>
          </div>
        </form>

      </div>

      <div className="conteinerImgs">
        {imagens.map((imagen, index) =>
          <div className="Img" id={imagen.codigoImagem} key={imagen.codigoImagem}>
            <img
              src={imagen.linkImagemCurso}
              alt={imagen.altImagem}
            />
            <div className="botonImage">
              <button onClick={() => DeletImagen(imagen.codigoImagem)}>Deletar</button>
            </div>
          </div>)}
      </div>
    </div>
  );
}

export default TabelaImgCursos;
