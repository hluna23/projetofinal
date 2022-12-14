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
              <ul key={produto.id}>
                <li> {produto.nome}</li>
                <li> {produto.descricao}</li>
                <li>Preco: {produto.preco}</li>
                <li>Categoria: {produto.categoria}</li>
                <li>Empreendedor: {produto.empreendedor}</li>
                <li>Contato: {produto.contato}</li>
              </ul>
            </div>
            
          )
        }

        )}
      </div>
    </div>
  );
}
