import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/page-home/page-home";
import Projetos from "../pages/page-projetos/projetos-home/page-projeto";
import ProjetosFormulario from "../pages/page-projetos/projetos-formulario/page-formulario-projeto";
import PageAlunos from "../pages/page-alunos/page-alunos-home/page-alunos";
import PageAlunosNaoAprovado from "../pages/page-alunos/page-alunos-home/page-alunos-nao-cadastrado";
import PageAlunosFormulario from "../pages/page-alunos/page-lunos-formulario/page-alunos-formulario";
import CongPage from "../pages/page-page/page";
import PageGestores from "../pages/page-gestores/page-gestores";
import Login from "../pages/Login/login";
import PageFormularioGestores from "../pages/page-gestores/pege-formulario-gestores/page-formulario-gestores";
import EditarProjetoFormularioPage from "../pages/page-projetos/EditarFormulario/EditarFormularioPage";

function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projetos" element={<Projetos />} />
      <Route path="/projetos/formulario/" element={<ProjetosFormulario/>}/>
      <Route path="/alunos" element={<PageAlunos/>}/>
      <Route path="/alunos/nao-aprovado" element={<PageAlunosNaoAprovado/>}/>
      <Route path="/formulario/aluno" element={<PageAlunosFormulario/>}/>
      <Route path="/formulario/aluno/:ras" element={<PageAlunosFormulario/>}/>
      <Route path="/page" element={<CongPage/>}/>
      <Route path="/gestores" element={<PageGestores/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/formulario/gestores" element={<PageFormularioGestores/>}/>
      <Route path="/formulario/gestores/:codigoGestor" element={<PageFormularioGestores/>}/>
      <Route path="/projetos/formulario/:codigoProjeto" element={<ProjetosFormulario/>}/>
    </Routes>
  );
}

export default Rotas;