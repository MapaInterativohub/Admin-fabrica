import { useEffect, useState } from "react";
import "./css-itens-lista-gestores.css"
import { Link } from "react-router-dom";

import axios from "axios";
function ItenGestores() {
  const [gestores, setGestores] = useState([]);

  const getGestores = () => {
    axios.get("http://localhost:8080/gestores/gestores")
      .then((res) => {
        setGestores(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.error("Erro na Busca", err)
      })
  }


  useEffect(() => {
    getGestores();
  }, [])

  return (
    <div className="lista-gestores">
      <h1>Gestores</h1>
      <div className="gestores">

        {gestores.map((gestor, i) => (
          <div className="info-gestores">
            <span>
              <i className="fa-solid fa-graduation-cap"></i> {gestor.name}
            </span>
            <div className="acoes">
              <span className="ra">(RA) {gestor.codigoGestor}</span>
              <Link to={`/formulario/gestores/${gestor.codigoGestor}`}> 
              <button>Visualizar</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ItenGestores;