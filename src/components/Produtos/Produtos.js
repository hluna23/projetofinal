import { useEffect, useState } from "react";
import Cabecalho from "../Cabecalho/Cabecalho";
import Loja from "../img/loja.jpg";
import { Button, Modal } from "react-bootstrap";
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

  return (
    <div>
      <div>
        <Cabecalho />
      </div>
      <h1 className="TituloC">Comercios</h1>

      <div id="comercios">
        {produtos.map((produto) => {
          return (
            <div key={produto.id}>
              <div id="Loja">
                <img src={Loja} alt="Loja" className="loja" />
                <ul>
                  <li> {produto.nomeProduto}</li>
                  <li> {produto.descricao}</li>
                  <li>Preco: {produto.preco}</li>
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
                  >
                    {" "}
                    Editar{""}
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => mostrarModal(produto.id)}
                    className="botoes-lista"
                  >
                    Apagar
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal show={edit} onHide={fecharModalEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <span>Nome do Produto: </span>
              <label>
                <input
                  type="text"
                  defaultValue={nomeProduto}
                  onChange={(e) => setNomeProduto(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Descrição: </span>
              <label>
                <input
                  type="text"
                  defaultValue={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Preço: </span>
              <label>
                <input
                  type="text"
                  defaultValue={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Categoria: </span>
              <label>
                <input
                  type="text"
                  defaultValue={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Empreendedor: </span>
              <label>
                <input
                  type="text"
                  defaultValue={empreendedor}
                  onChange={(e) => setEmpreendedor(e.target.value)}
                />
              </label>
            </div>
            <div>
              <span>Contato: </span>
              <label>
                <input
                  type="text"
                  defaultValue={contato}
                  onChange={(e) => setContato(e.target.value)}
                />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModalEdit}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={alterarProduto}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apagar produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza?
          <br /> Se apaga o produto não vai poder recuperar essa informação!!!.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={apagarProduto}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
