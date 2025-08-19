import "./css-itens-lista-gestores.css"
import { Link } from "react-router-dom";
function ItenGestores(){
 return (
  <div className="lista-gestores">
    <h1>Gestores</h1>
    <div className="gestores">
      <div className="info-gestores">
        <span>
          <i className="fa-solid fa-graduation-cap"></i> Nome do Gestores - Curso
        </span>
        <div className="acoes">
          <span className="ra">(RA)</span>
          <button>Visualizar</button>
        </div>
      </div>
    </div>
  </div>
);
}
export default ItenGestores;