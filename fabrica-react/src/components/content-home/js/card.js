import "../css/css-cards.css";
function Cards() {
  return (
    <div className="infoGeral">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />
      <div class="cardinfoGeral" id="cardGestores">
        <a href="#">
          <i className="fa-solid fa-people-roof"></i>
          <div className="info">
            <div className="txtCard">
              <h1>3</h1>
              <h2>Gestores</h2>
            </div>
          </div>
        </a>
      </div>
      <div className="cardinfoGeral" id="cardProjetos">
        <a href="#">
          <i className="fa-solid fa-graduation-cap"></i>
          <div className="info">
            <div className="txtCard">
              <h1>3</h1>
              <h2>Alunos</h2>
            </div>
          </div>
        </a>
      </div>
      <div className="cardinfoGeral" id="cardAlunos">
        <a href="#">
          <i className="fa-solid fa-sheet-plastic"></i>
          <div className="info">
            <div className="txtCard">
              <h1>3</h1>
              <h2>Projetos</h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
export default Cards;
