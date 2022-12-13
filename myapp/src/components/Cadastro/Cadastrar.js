import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";

export default function Criar() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [empreendimento, setEmpreendimento] = useState("");
  const [empreendedor, setEmpreendedor] = useState("");

  const novoCadastro = async () => {
    const cadastroPost = {
      nome,
      telefone,
      email,
      empreendedor,
      empreendimento,
    };

    //crear cadastro
    await fetch("http://localhost:3004/cadastro", {
      method: "POST",
      body: JSON.stringify(cadastroPost),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  };

  return (
    <div>
      <Cabecalho />
      <div>
        <form>
          <span>Você é empreendedor?</span>
          <div>
            <input
              type="radio"
              id="empreendedor"
              name="empreendedor"
              value="sim"
              onChange={(e) => setEmpreendedor(e.target.value)}
            />
            <label htmlFor="sim">Sim</label>
            <input
              type="radio"
              id="naoempreendedor"
              name="empreendedor"
              value="nao"
              onChange={(e) => setEmpreendedor(e.target.value)}
            />
            <label htmlFor="nao">Ainda não</label>
          </div>
          <div>
            <span>Nome: </span>
            <label>
              <input
                type="text"
                placeholder="Nome Sobrenome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
          </div>
          <div>
            <span>Telefone: </span>
            <label>
              <input
                type="text"
                placeholder="(xx) xxxxx-xxxx"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </label>
          </div>
          <div>
            <span>E-mail: </span>
            <label>
              <input
                type="text"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <span>Descreva seu empreendimento: </span>
            <label>
              <input
                type="text"
                placeholder="Descreva seu empreendimento detalhadamente"
                value={empreendimento}
                onChange={(e) => setEmpreendimento(e.target.value)}
              />
            </label>
          </div>
        </form>
        <Link to="/">
          <Button style={{color: "blue"}}
            variant="success"
            onClick={novoCadastro}
            className="botao-cadastro"
          >
            Cadastrar
          </Button>
        </Link>
      </div>
    </div>
  );
}
