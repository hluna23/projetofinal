import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./Cadastrar.css";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [empreendimento, setEmpreendimento] = useState("");
  const [empreendedor, setEmpreendedor] = useState("");

  const [estadoDoBotao, setEstadoDoBotao] = useState(true);

  const [validated, setValidated] = useState(false);

  const cadastrarUsuario = async () => {
    const cadastroPost = {
      nome,
      telefone,
      email,
      empreendedor,
      empreendimento,
    };

    await fetch("http://localhost:3004/cadastro", {
      method: "POST",
      body: JSON.stringify(cadastroPost),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setEstadoDoBotao(true);
    } else {
      setValidated(true);
      setEstadoDoBotao(false);
    }
  };

  return (
    <div>
      <Cabecalho />
      <div>
        <h1>
          <b>Cadastro de Clientes ou Empreendedores</b>
        </h1>
        <Form
          noValidate
          validated={validated}
          onChange={handleSubmit}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3" id="formulario">
            <Form.Group as={Col} controlId="nome" className="position-relative">
              <Form.Label>Nome e Sobrenome:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome e Sobrenome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Perfeito!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="telefone"
              className="position-relative"
            >
              <Form.Label>Telefone: </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="xx xxxxx-xxxx"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="email"
              className="position-relative"
            >
              <Form.Label>E-mail: </Form.Label>
              <Form.Control
                type="email"
                placeholder="email@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Perfeito!!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="empreendimento"
              className="position-relative"
            >
              <Form.Label>Empreendimento</Form.Label>
              <Form.Control
                className="descricao"
                required
                type="text"
                placeholder="Descreva aqui seu empreendimento"
                value={empreendimento}
                onChange={(e) => setEmpreendimento(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Muito bem!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <span>Você é empreendedor?</span>
              <div>
                <br />
                <input
                  type="radio"
                  id="empreendedor"
                  name="empreendedor"
                  value="sim"
                  onChange={(e) => setEmpreendedor(e.target.value)}
                />
                <label htmlFor="Sim"> Sim</label>
                <br />
                <input
                  type="radio"
                  id="naoempreendedor"
                  name="empreendedor"
                  value="nao"
                  onChange={(e) => setEmpreendedor(e.target.value)}
                />
                <label htmlFor="Não"> Ainda não</label>
              </div>
            </Form.Group>
          </Row>

          <Button
            className="botao-cadastro"
            disabled={estadoDoBotao}
            type="submit"
            variant="success"
            onClick={cadastrarUsuario}
          >
            <b>Cadastrar</b>
          </Button>
        </Form>
      </div>
    </div>
  );
}
