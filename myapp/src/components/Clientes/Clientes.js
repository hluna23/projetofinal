import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./Clientes.css"

//atualizar, apagar cadastro

export default function Clientes() {
  const [cadastro, setCadastro] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [empreendedor, setEmpreendedor] = useState("");
  const [empreendimento, setEmpreendimento] = useState("");

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
    fecharModalEdit()
  };

  //apagar cadastro
  const apagarCadastro = async () => {
    await fetch(`http://localhost:3004/cadastro/${id}`, {
      method: "DELETE",
    });
    atualizarCadastro();
    fecharModal();
  };

  return (
    <div>
      <Cabecalho />
      <h1>Empreendedores cadastrados</h1>

      {cadastro.map((contato) => {
        return (
          <div key={contato.id}>
            <ul>
              <li>Nome: {contato.nome}</li>
              <li>Email: {contato.email}</li>
              <li>Telefone: {contato.telefone}</li>
              <li>Empreendedor: {contato.empreendedor}</li>
              <li>Descricao do empreendimento: {contato.empreendimento}</li>
            </ul>
            <div>
              <Button
                variant="outline-success"
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
                Editar{" "}
              </Button>
              <br />
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => mostrarModal(contato.id)}
                className="botoes-lista"
              >
                Apagar
              </Button>
            </div>
          </div>
        );
      })}

      <Modal show={edit} onHide={fecharModalEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="FormuCadastro">
            <div>              
              <label>Nome:
                <input className="input"
                  type="text"
                  defaultValue={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>Email:
                <input className="input"
                  type="text"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label> Telefone:
                <input className="input"
                  type="text"
                  defaultValue={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </label>
            </div>
            <div> 
              <label> Empreendedor:
                <input className="input"
                  type="text"
                  defaultValue={empreendedor}
                  onChange={(e) => setEmpreendedor(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>Descrição:
                <input className="input"
                  type="text"
                  defaultValue={empreendimento}
                  onChange={(e) => setEmpreendimento(e.target.value)}
                />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModalEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={alterarCadastro}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apagar cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza?
          <br /> Esta informação não poderá ser recuperada.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={apagarCadastro}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
