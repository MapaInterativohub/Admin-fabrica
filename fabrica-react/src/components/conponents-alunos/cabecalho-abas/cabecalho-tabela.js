import { useEffect, useState } from 'react';
import './css-cabecalho-tabela.css'
import axios from 'axios';

function CabecalhoTabela() {
    const [quantidadeAlunos,setQuantidadeAlunos] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/alunos/alunos").then((res)=>{
            setQuantidadeAlunos(res.data);
        }).catch((err)=>{
            console.log("Erro na Busca",err)
        })
    },[])

    return (
        <div>
            <div className="head-alunos">
                <h1>Titulo tabela</h1>
                <h2>Total de Alunos:{quantidadeAlunos.length}</h2>
            </div>
        </div>
    );
}
export default CabecalhoTabela;