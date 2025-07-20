import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/page-home/page-home";
import Projetos from "../pages/page-projetos/projetos-home/page-projeto";
import ProjetosFormulario from "../pages/page-projetos/projetos-formulario/page-formulario-projeto";
import PageAlunos from "../pages/page-alunos/page-alunos-home/page-alunos";
import PageAlunosNaoAprovado from "../pages/page-alunos/page-alunos-home/page-alunos-nao-cadastrado";
import PageAlunosFormulario from "../pages/page-alunos/page-lunos-formulario/page-alunos-formulario";
import CongPage from "../pages/page-page/page";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/projetos/formulario" element={<ProjetosFormulario/>}/>
      <Route path="/alunos" element={<PageAlunos/>}/>
      <Route path="/alunos/nao-aprovado" element={<PageAlunosNaoAprovado/>}/>
      <Route path="/formulario/aluno" element={<PageAlunosFormulario/>}/>
      <Route path="/page" element={<CongPage/>}/>
    </Routes>
  );
}

export default Rotas;