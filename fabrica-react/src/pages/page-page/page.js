import React from "react";
import "./css-page.css";
import NavBar from "../../components/nav-bar/nav-bar";
import Title from "../../components/title/tile";
import Carrossel from "../../components/compnentes-page/carossel/carrossel";

function CongPage() {
  return (
    <main>
      <NavBar />
      <section>
        <Title Titulo={"Configuração Pagina Principal"} />
        <div className="Conteudo">
          <Carrossel/>
        </div>
      </section>
    </main>
  );
}
export default CongPage;
