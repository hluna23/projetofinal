import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./ValidarForm";

export default function CadastroProduto() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nomeEmpreendedor, setNomeEmpreendedor] = useState("");
  const [contato, setContato] = useState("");

  const novoCadastro = async () => {
    const cadastroPost = {
      nomeProduto,
      descricao,
      preco,
      categoria,
      nomeEmpreendedor,
      contato,
    };

    await fetch("http://localhost:3004/produtos", {
      method: "POST",
      body: JSON.stringify(cadastroPost),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  };

    return (
      <div>
        <Cabecalho />
        <br />
        <div>
          <form>
            <div>
              <span>Nome do produto: </span>
              <label>
                <input
                  type="text"
                  placeholder="produto do projeto X"
                  value={nomeProduto}
                  onChange={(e) => setNomeProduto(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Descrição: </span>
              <label>
                <input
                  type="text"
                  placeholder="descriva seu produto brevemente"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Preço: </span>
              <label>
                <input
                  type="text"
                  placeholder="R$ 100,00"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Categoria: </span>
              <label>
                <input
                  type="text"
                  placeholder="serviços"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <span> Empreendedor: </span>
                <input
                  placeholder="Nome Sobrenome"
                  value={nomeEmpreendedor}
                  onChange={(e) => setNomeEmpreendedor(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <span>Contato:</span>
                <input
                  placeholder="(xx) xxxxx-xxxx"
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                />
              </label>
            </div> 
          </form>
          <Link to="/cadastrar">
            <Button
              variant="success"
              onClick={novoCadastro}
              className="botao-cadastro"
            >
              Cadastrar Produto
            </Button>
          </Link>
        </div>
      </div>
    );
  };

