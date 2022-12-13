import { useEffect, useState } from "react";
import Cabecalho from "../Cabecalho/Cabecalho";
import Loja from "../img/loja.jpg"
import "./Produtos.css"

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/produtos")
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  }, []);

  return (
    <div >
      <Cabecalho />
      <h1 className="TituloC">Comercios</h1>
      <div id="comercios">
        {produtos.map((produto)=>{
          return(
            <div id="Loja">
              <img src={Loja} alt="Loja" className="loja"/>
              <div key={produto.id}>
                <p> {produto.nome}</p>
                <p> {produto.descricao}</p>
                <p>Preco: {produto.preco}</p>
                <p>Categoria: {produto.categoria}</p>
                <p>Empreendedor: {produto.empreendedor}</p>
                <p>Contato: {produto.contato}</p>
              </div>
            </div>
            
          )
        }

        )}
      </div>
    </div>
  );
}
