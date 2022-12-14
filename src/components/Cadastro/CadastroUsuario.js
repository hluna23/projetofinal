import React, { useState } from "react";
import { isRouteErrorResponse, Link } from "react-router-dom";
import { Button, Col, Row, Form } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";

export default function CadastroUsuario() {
  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [empreendimento, setEmpreendimento] = useState("");
  const [empreendedor, setEmpreendedor] = useState("");
  const [errors, setErrors] = useState('')

  const novoCadastro = async () => {
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
    }

    setValidated(true);
  };

  return (
    <div>
      <Cabecalho />
      <div>
        <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
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
          <br />
            <Form.Group as={Col} md="4" controlId="nome" className='position-relative'>
              <Form.Label>Nome e Sobrenome:</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome e Sobrenome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                isValid={nome && !errors.nome}
              />
              <Form.Control.Feedback tooltip>Perfeito!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="telefone" className='position-relative'>
              <Form.Label>Telefone: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="(xx) xxxxx-xxxx"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                isValid={telefone && !errors.telefone}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="email" className='position-relative'>
              <Form.Label>E-mail: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isValid={email && !errors.email}

              />
              <Form.Control.Feedback tooltip>Perfeito!!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="empreendimento" className='position-relative'>
              <Form.Label>Empreendimento</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Descreva aqui detalhadamente seu empreendimento"
                value={empreendimento}
                onChange={(e) => setEmpreendimento(e.target.value)}
                isValid={empreendimento && !errors.empreendimento}

              />
              <Form.Control.Feedback tooltip>Muito bem!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Link to="/cadastro-produto">
            <Button
              type="submit"
              variant="success"
              onClick={novoCadastro}
              className="botao-cadastro"
            >
              Cadastrar
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}
