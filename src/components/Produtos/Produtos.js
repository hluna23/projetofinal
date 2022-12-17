import { useEffect, useState } from "react";
import Cabecalho from "../Cabecalho/Cabecalho";
import Loja from "../img/loja.jpg";
import { Button, Form, Col, Modal, Row } from "react-bootstrap";
import "./Produtos.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [id, setId] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [empreendedor, setEmpreendedor] = useState("");
  const [contato, setContato] = useState("");

  const [estadoDoBotao, setEstadoDoBotao] = useState(true);

  const [validated, setValidated] = useState(false);

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
    nomeProduto,
    descricao,
    preco,
    categoria,
    empreendedor,
    contato
  ) => {
    setId(id);
    setNomeProduto(nomeProduto);
    setDescricao(descricao);
    setPreco(preco);
    setCategoria(categoria);
    setEmpreendedor(empreendedor);
    setContato(contato);
    setEdit(true);
  };

  useEffect(() => {
    atualizarProduto();
  }, []);

  const atualizarProduto = () => {
    fetch("http://localhost:3004/produtos")
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  };

  const alterarProduto = async () => {
    const cadastroPatch = {
      nomeProduto,
      descricao,
      preco,
      categoria,
      empreendedor,
      contato,
    };

    await fetch(`http://localhost:3004/produtos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(cadastroPatch),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    atualizarProduto();
    fecharModalEdit();
  };

  //apagar produto
  const apagarProduto = async () => {
    await fetch(`http://localhost:3004/produtos/${id}`, {
      method: "DELETE",
    });

    atualizarProduto();
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
      <h1 className="TituloC"><b>Produtos dos Comercios</b> </h1>

      <div id="comercios">
        {produtos.map((produto) => {
          return (
            <div key={produto.id}>
              <div id="Loja">
                <img src={Loja} alt="Loja" className="loja" />
              <h3><b>Produto</b></h3>

                <ul>
                  <li> {produto.nomeProduto}</li>
                  <li> {produto.descricao}</li>
                  <li>Preço: R$.{produto.preco}</li>
                  <li>Categoria: {produto.categoria}</li>
                  <li>Empreendedor: {produto.empreendedor}</li>
                  <li>Contato: {produto.contato}</li>
                </ul>
                <div>
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() =>
                      mostrarModalEdit(
                        produto.id,
                        produto.nomeProduto,
                        produto.descricao,
                        produto.preco,
                        produto.categoria,
                        produto.empreendedor,
                        produto.contato
                      )
                    }
                    className="botoes-lista"
                  ><b>
                    Editar</b>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => mostrarModal(produto.id)}
                    className="botoes-lista"
                  ><b>
                    Apagar</b>
                  </Button>
                </div>
              </div>
              <br/>
            </div>
          );
        })}
      </div>
        <div className="editarProduto">
          <Modal show={edit} onHide={fecharModalEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Editar produto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                id="editar"
                noValidate
                validated={validated}
                onChange={handleSubmit}
                onSubmit={handleSubmit}
              >
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="nomeProduto"
                    className="position-relative"
                  >
                    <Form.Label>Nome do Produto: </Form.Label>

                    <Form.Control
                      required
                      type="text"
                      defaultValue={nomeProduto}
                      onChange={(e) => setNomeProduto(e.target.value)}
                    />
                    <Form.Control.Feedback tooltip>
                      Agora sim?
                    </Form.Control.Feedback>
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
                      defaultValue={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                    <Form.Control.Feedback tooltip>
                      Aqui tambem?
                    </Form.Control.Feedback>
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
                      type="text"
                      defaultValue={preco}
                      onChange={(e) => setPreco(e.target.value)}
                    />
                    <Form.Control.Feedback tooltip>
                      Trocou foi?
                    </Form.Control.Feedback>
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
                      defaultValue={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                    />
                    <Form.Control.Feedback tooltip>
                      Arrasou!!!
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="empreendedor"
                    className="position-relative"
                  >
                    <Form.Label>Nome do empreendedor: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={empreendedor}
                      onChange={(e) => setEmpreendedor(e.target.value)}
                    />
                    <Form.Control.Feedback tooltip>
                      Arrasou!!!
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="contato"
                    className="position-relative"
                  >
                    <Form.Label>Contato: </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={contato}
                      onChange={(e) => setContato(e.target.value)}
                    />
                    <Form.Control.Feedback tooltip>
                      Arrasou!!!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={fecharModalEdit}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                disabled={estadoDoBotao}
                onClick={alterarProduto}
              >
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      <Modal show={show} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apagar produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza?
          <br /> Ao confirmar, o produto selecionado não vai se poder
          recuperar!!!.
        </Modal.Body>
        <Modal.Footer>
          <Button className="boton1" variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button className="boton2" variant="primary" onClick={apagarProduto}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
