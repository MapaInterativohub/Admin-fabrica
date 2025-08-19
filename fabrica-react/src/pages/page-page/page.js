import React from "react";
import "./css-page.css";
import NavBar from "../../components/nav-bar/nav-bar";
import Title from "../../components/title/tile";
import Carrossel from "../../components/compnentes-page/carossel/carrossel";
import InformacaoDaFabrica from "../../components/compnentes-page/informacaoDaFabrica/informacaodafabrica"
import ConfigConteinerCurso from "../../components/compnentes-page/config-conteiner-cursos/config-conteiner-cursos";
function CongPage() {
  return (
    <main>
      <NavBar />
      <section>
        <Title Titulo={"Configuração Pagina Principal"} />
        <div className="Conteudo">
          <Carrossel/>
          <InformacaoDaFabrica/>
          <ConfigConteinerCurso/>
        </div>
      </section>
    </main>
  );
}
export default CongPage;
