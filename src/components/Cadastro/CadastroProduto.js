import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./Cadastrar.css";

export default function CadastroProduto() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nomeEmpreendedor, setNomeEmpreendedor] = useState("");
  const [contato, setContato] = useState("");

  const [validated, setValidated] = useState(false);
  const [estadoDoBotao, setEstadoDoBotao] = useState(true);

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
          <b>Cadastro de Produtos</b>
        </h1>
        <Form
          noValidate
          validated={validated}
          onChange={handleSubmit}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3" id="formulario">
            <Form.Group
              as={Col}
              controlId="nomeDoProduto"
              className="position-relative"
            >
              <Form.Label>Nome do produto: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="produto do projeto X"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Perfeito!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="descricao"
              className="position-relative"
            >
              <Form.Label>Descrição: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="descriva seu produto brevemente"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="preco"
              className="position-relative"
            >
              <Form.Label>Preço: </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="1.000"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Nossa!!!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="categoria"
              className="position-relative"
            >
              <Form.Label>Categoria: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="serviços"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="empreendedor"
              className="position-relative"
            >
              <Form.Label> Empreendedor: </Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome Sobrenome do empreendedor"
                value={nomeEmpreendedor}
                onChange={(e) => setNomeEmpreendedor(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="contato"
              className="position-relative"
            >
              <Form.Label>Contato:</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="xx xxxxx-xxxx"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button
            className="botao-cadastro"
            disabled={estadoDoBotao}
            type="submit"
            variant="success"
            onClick={novoCadastro}
          >
            <b>Cadastrar Produto</b>
          </Button>
        </Form>
      </div>
    </div>
  );
}
