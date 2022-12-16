import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Col, Row, Form } from "react-bootstrap";

export default function EditarCadastro() {
  const { id } = useParams();
  const [cadastro, setCadastro] = useState({});

  const [nome, setNome] = useState(cadastro.nome);
  const [telefone, setTelefone] = useState(cadastro.telefone);
  const [email, setEmail] = useState(cadastro.email);
  const [empreendimento, setEmpreendimento] = useState(cadastro.empreendimento);

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3004/cadastro/${id}`)
      .then((response) => response.json())
      .then((data) => setCadastro(data));
  }, [id]);

  const alterarCadastro = async () => {
    const cadastroPatch = {
      nome,
      email,
      telefone,
      empreendimento,
    };

    await fetch(`http://localhost:3004/cadastro/${id}`, {
      method: "PATCH",
      body: JSON.stringify(cadastroPatch),
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
      <h3>Editar contato</h3>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="4"
            controlId="nome"
            className="position-relative"
          >
            <Form.Label>Nome e Sobrenome:</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue={cadastro.nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Form.Control.Feedback tooltip>Perfeito!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            controlId="telefone"
            className="position-relative"
          >
            <Form.Label>Telefone: </Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue={cadastro.telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            controlId="email"
            className="position-relative"
          >
            <Form.Label>E-mail: </Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue={cadastro.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback tooltip>Perfeito!!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            controlId="empreendimento"
            className="position-relative"
          >
            <Form.Label>Empreendimento</Form.Label>
            <Form.Control
              required
              type="text"
              defaultValue={cadastro.empreendimento}
              onChange={(e) => setEmpreendimento(e.target.value)}
            />
            <Form.Control.Feedback tooltip>Muito bem!</Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>

      <Link to="/">
        <Button variant="success" onClick={alterarCadastro}>
          Alterar cadastro
        </Button>
      </Link>
    </div>
  );
}
