import "./stale-tile.css";
import { Link } from "react-router-dom";

function Title({Titulo}) {
  return (
    <div className="title">
      <div class="textotitle">
          <h1>Fabrica de Software - {Titulo}</h1>
      </div>
      <div class="user">
        <Link to="/gestores" class="textNave">
          <i class="fa-solid fa-circle-user"></i>Gestores
        </Link>
      </div>
    </div>
  );
}

export default Title;
