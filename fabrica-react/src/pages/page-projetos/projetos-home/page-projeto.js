import "./page-css-projeto.css"
import NavBar from "../../../components/nav-bar/nav-bar";
import Title from "../../../components/title/tile";
import LabelInfo from "../../../components/label-info/label-info";
import ListaProjetos from "../../../components/conponents-projetos/lista-projetos/list-projetos";

function Projetos() {
  return (
    <main>
      <NavBar/>
      <section>
        <Title Titulo={"Projetos"}/>
        <div className="Conteudo">
          <LabelInfo rota={"/projetos/formulario"}/>
          <ListaProjetos/>
        </div>
      </section>
    </main>
  );
}
export default Projetos;
