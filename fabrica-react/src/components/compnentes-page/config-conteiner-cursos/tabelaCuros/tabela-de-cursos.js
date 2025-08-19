import "./css-tabela-de-cuso.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function TabelaDeCurso() {
  let abaDeCriacaoDeCurso = false;
  const [cursos, setCursos] = useState([]);

  //função para get dos cursos do banco de dados
  const getCursos = async()=>{
    axios.get("http://localhost:8080/curso/curso")
      .then((res) => {
        setCursos(res.data)
      })
      .catch((err) => {
        console.log("Erro ao buscar os dados", err)
      })
  }

  useEffect(() => {
    getCursos();
  }, []);

  //função para deletar cursos
  function DeletarCurso(codigoDoCurso) {
    const confirmar = window.confirm(`Tem certeza que deseja deletar esta Curso ${codigoDoCurso}`);
    if (!confirmar) return;

    axios.delete(`http://localhost:8080/curso/curso/${codigoDoCurso}`)
      .then(response => {
        console.log('Item deletado com sucesso!');
        setCursos((prevCurso) =>
          prevCurso.filter((curso) => curso.codigoDoCurso !== codigoDoCurso)
        );
      })
      .catch(error => {
        console.error('Erro ao deletar item:', error);
      });
  }

  // função para Criação de novos cursos
  const [nomeDoCurso, setNomeDoCurso] = useState('');
  const [mensagem, setMensagem] = useState('')

  const FormularioDeEnvioDeCursos = async (e) => {
    e.preventDefault();

    if (!nomeDoCurso.trim()) {
      setMensagem('Preencha o campo.');
      return; // interrompe o envio
    }
    try {
      const dados = {nomeDoCurso};
      const response = await axios.post("http://localhost:8080/curso/curso", dados);

      await getCursos();
      setMensagem("Imagens Enviada");
      setNomeDoCurso('');
    } catch (error) {

      console.error(error);
      setMensagem('Erro ao enviar o formulário.');
    }

  };

  function AbriFormularioDeCriacaoDeCurso(){
    const aba = document.getElementById("fomularioDeEnviodeCurso");
    const text = document.getElementById("btnAdicionarCurso");

    if(!abaDeCriacaoDeCurso){
      aba.style.display = "block";
      text.innerText="Cancelar"
      abaDeCriacaoDeCurso = true;
    }else{
      aba.style.display = "none";
      text.innerText="Adicionar"
      abaDeCriacaoDeCurso = false;
      setNomeDoCurso('');
    }
  }

  return (
    <div className="tabelaCursos">
      <div className="haderCursos">
        <h1>Categoria Cursos</h1>
        <button onClick={() =>AbriFormularioDeCriacaoDeCurso()} id="btnAdicionarCurso">Adicionar</button>
      </div>

      <div className="fomularioEnviodeCurso" id="fomularioDeEnviodeCurso">
        <form id="formularioEnvio" onSubmit={FormularioDeEnvioDeCursos}>
          <div className="imputC">
            <label>Nome do Curso:
              <input
                type="text"
                id="NomeDoCurso"
                value={nomeDoCurso}
                onChange={(e) => setNomeDoCurso(e.target.value)}
              />
            </label>
          </div>
          <div className="btnEnvio">
            <button type="submit" className="save">Salvar</button>
            <h1>{mensagem}</h1>
          </div>
        </form>
      </div>

      <div className="ContentCursos">
        {cursos.map((cursos, index) =>
          <div className="curso">
            <div className="textCurso" id={cursos.codigoDoCurso} key={cursos.codigoDoCurso}>
              <h1>{cursos.codigoDoCurso}:</h1>
              <h1>{cursos.nomeDoCurso}</h1>
            </div>
            <button onClick={() => DeletarCurso(cursos.codigoDoCurso)}>Deletar</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default TabelaDeCurso;
