import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Form } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";

export default function CadastroProduto() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nomeEmpreendedor, setNomeEmpreendedor] = useState("");
  const [contato, setContato] = useState("");

  const [validated, setValidated] = useState(false);

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
    }

    setValidated(true);
  };

  return (
    <div>
      <Cabecalho />
      <div>
        <Form
          noValidate
          validated={validated}
          onClick={handleSubmit}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
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
              md="4"
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
              md="4"
              controlId="preco"
              className="position-relative"
            >
              <Form.Label>Preço: </Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="R$ 100,00"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Nossa!!!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
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
              md="4"
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
              md="4"
              controlId="contato"
              className="position-relative"
            >
              <Form.Label>Contato:</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="(xx) xxxxx-xxxx"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
              />
              <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button
            type="submit"
            variant="success"
            onClick={novoCadastro}
            className="botao-cadastro"
          >
            Cadastrar Produto
          </Button>
        </Form>
      </div>
    </div>
  );
}
