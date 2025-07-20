import "./css-carrossel.css";
import { register } from "swiper/element/bundle";
import "swiper/css";

// Registra os Web Components do Swiper
register();

function Carrossel() {
  return (
    <div className="carrossel">
      <div className="heder-carrossel">
        <h1>Editar Imagens Carrossel</h1>
        <from className="quantidade-imagem-carrossel">
          <label>Quantidade de Imagens</label>
          <input type="number" id="quantidadeIMG"/>
        </from>
      </div>
      <swiper-container
        slides-per-view="1"
        loop="true"
        autoplay="true"
        pagination="true"
        style={{ width: "100%", height: "300px" }} // exemplo de estilo direto
      >
        <swiper-slide>
          <button className="BtnImagem">Editar</button>
          <img
            src="https://f.i.uol.com.br/fotografia/2021/02/18/1613671086602eaaae9c32f_1613671086_3x2_md.jpg"
            alt="Praia 1"
          />
        </swiper-slide>
        <swiper-slide>
          <button className="BtnImagem">Editar</button>
          <img
            src="https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg"
            alt="Praia 2"
          />
        </swiper-slide>
        <swiper-slide>
          <button className="BtnImagem">Editar</button>
          <img
            src="https://marketplace.canva.com/MADFh5AG-rk/1/thumbnail_large/canva-sea-MADFh5AG-rk.jpg"
            alt="Praia 3"
          />
        </swiper-slide>
      </swiper-container>
    </div>
  );
}

export default Carrossel;
