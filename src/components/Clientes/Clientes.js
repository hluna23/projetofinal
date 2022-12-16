import { useState, useEffect } from "react";
import { Button, Form, Col, Modal, Row } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./Clientes.css";

//atualizar, apagar cadastro

export default function Clientes() {
  const [cadastro, setCadastro] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empreendedor, setEmpreendedor] = useState("");
  const [empreendimento, setEmpreendimento] = useState("");

  const [validated, setValidated] = useState(false);

  const [estadoDoBotao, setEstadoDoBotao] = useState(true);

  const [show, setShow] = useState(false);
  const fecharModal = () => setShow(false);
  const mostrarModal = (key) => {
    setId(key);
    setShow(true);
  };

  const [edit, setEdit] = useState(false);
  const fecharModalEdit = () => setEdit(false);
  const mostrarModalEdit = (
    id,
    nome,
    email,
    telefone,
    empreendedor,
    empreendimento
  ) => {
    setId(id);
    setNome(nome);
    setEmail(email);
    setTelefone(telefone);
    setEmpreendedor(empreendedor);
    setEmpreendimento(empreendimento);
    setEdit(true);
  };

  useEffect(() => {
    atualizarCadastro();
  }, []);

  const atualizarCadastro = () => {
    fetch("http://localhost:3004/cadastro")
      .then((response) => response.json())
      .then((data) => setCadastro(data));
  };

  const alterarCadastro = async () => {
    const cadastroPatch = {
      nome,
      email,
      telefone,
      empreendedor,
      empreendimento,
    };

    await fetch(`http://localhost:3004/cadastro/${id}`, {
      method: "PATCH",
      body: JSON.stringify(cadastroPatch),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    atualizarCadastro();
    fecharModalEdit();
  };

  //apagar cadastro
  const apagarCadastro = async () => {
    await fetch(`http://localhost:3004/cadastro/${id}`, {
      method: "DELETE",
    });
    atualizarCadastro();
    fecharModal();
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
      <div>
        <Cabecalho />
      </div>
      <h1 className="tituloE">
        {" "}
        <b>Empreendedores cadastrados</b>
      </h1>

      <div id="FormuCadastro">
        {cadastro.map((contato) => {
          return (
            <div key={contato.id}>
              <div className="usuario">
                <h3>
                  <b>Empreendedor</b>
                </h3>
                <ul>
                  <li>Nome: {contato.nome}</li>
                  <li>E-mail: {contato.email}</li>
                  <li>Telefone: {contato.telefone}</li>
                  <li>Empreendedor: {contato.empreendedor}</li>
                  <li>Descricao do empreendimento: {contato.empreendimento}</li>
                </ul>
                <div>
                  <Button
                    variant="line-success"
                    size="sm"
                    onClick={() =>
                      mostrarModalEdit(
                        contato.id,
                        contato.nome,
                        contato.email,
                        contato.telefone,
                        contato.empreendedor,
                        contato.empreendimento
                      )
                    }
                    className="botoes-lista"
                  >
                    <b>Editar</b>
                  </Button>
                  <Button
                    variant="line-danger"
                    size="sm"
                    onClick={() => mostrarModal(contato.id)}
                    className="botoes-lista"
                  >
                    <b>Apagar</b>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <Modal show={edit} onHide={fecharModalEdit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <b>Editar Cadastro</b>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form
              noValidate
              validated={validated}
              onChange={handleSubmit}
              onSubmit={handleSubmit}
            >
              <Row className="mb-3" id="editar">
                <Form.Group
                  as={Col}
                  controlId="nome"
                  className="position-relative"
                >
                  <Form.Label>Nome e Sobrenome:</Form.Label>
                  <Form.Control
                    required
                    className="input"
                    type="text"
                    defaultValue={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <Form.Control.Feedback tooltip>
                    Perfeito!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="email"
                  className="position-relative"
                >
                  <Form.Label>E-mail: </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback tooltip>
                    Perfeito!!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="telefone"
                  className="position-relative"
                >
                  <Form.Label>Telefone: </Form.Label>
                  <Form.Control
                    required
                    className="input"
                    type="number"
                    defaultValue={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                  <Form.Control.Feedback tooltip>Ótimo!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="empreendedor"
                  className="position-relative"
                >
                  <Form.Label>Você é empreendedor?</Form.Label>
                  <Form.Control
                    required
                    className="input"
                    type="text"
                    defaultValue={empreendedor}
                    onChange={(e) => setEmpreendedor(e.target.value)}
                  />
                  <Form.Control.Feedback tooltip>
                    Muito bem!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="empreendimento"
                  className="position-relative"
                >
                  <Form.Label >Descrição do seu empreendimento:</Form.Label>
                  <Form.Control
                    
                    id='descricao'
                    required
                    className="input"
                    type="text"
                    defaultValue={empreendimento}
                    onChange={(e) => setEmpreendimento(e.target.value)}
                  />
                  <Form.Control.Feedback tooltip>
                    Muito bem!
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="botao-modal"
              variant="secondary"
              onClick={fecharModalEdit}
            >
              <b>Cancelar</b>
            </Button>
            <Button
              className="botao-modal"
              variant="primary"
              disabled={estadoDoBotao}
              onClick={alterarCadastro}
            >
              <b>Confirmar</b>
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title><b>Apagar Cadastro</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza??
            <br /> Essa informação <b>NÃO</b> poderá ser recuperada...
          </Modal.Body>
          <Modal.Footer>
            <Button 
              className="botao-modal"
              variant="secondary" onClick={fecharModal}>
              <b>Cancelar</b>
            </Button>
            <Button 
              className="botao-modal"
              variant="primary" onClick={apagarCadastro}>
              <b>Confirmar</b>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
