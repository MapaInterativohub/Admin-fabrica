import "./style-nav-bar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="menu">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <Link to="/"><img
        src="https://unisales.br/wp-content/uploads/2020/03/Logo-UniSales-Branca_Horizontal.png"
        alt="logo"
      /></Link>
      <ul className="listaNave">
        <li className="navItem">
          <Link to="/" className="textNave">
            <i className="fa-solid fa-house"></i>Home
          </Link>
        </li>
        <li className="navItem">
          <Link to="/projetos" className="textNave">
            <i className="fa-solid fa-sheet-plastic"></i>Projetos
          </Link>
        </li>
        <li className="navItem">
        <Link to="/alunos" className="textNave">
            <i className="fa-solid fa-graduation-cap"></i>Alunos
          </Link>
        </li>
        <li className="navItem">
        <Link to="/gestores" className="textNave">
            <i className="fa-solid fa-people-roof"></i>Gestores
          </Link>
        </li>
        <li className="navItem">
        <Link to="/page" className="textNave">
            <i className="fa-solid fa-file"></i>Page
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default NavBar;
