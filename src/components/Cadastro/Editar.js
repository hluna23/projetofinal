import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function EditarCadastro() {
  const { id } = useParams();
  const [cadastro, setCadastro] = useState({});

  const [nome, setNome] = useState(cadastro.nome);
  const [telefone, setTelefone] = useState(cadastro.telefone);
  const [email, setEmail] = useState(cadastro.email);

  useEffect(() => {
    fetch(`http://localhost:3004/cadastro/${id}`)
      .then((response) => response.json())
      .then((data) => setCadastro(data));
  }, [id]);

  const alterarCadastro = async () => {

    const cadastroPatch = {
        nome,
        email,
        telefone
    }

    await fetch(`http://localhost:3004/cadastro/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(cadastroPatch),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
  };

  return (
    <div>
      <h3>Editar contato</h3>

      <form>
        <div>
        <span>Nome: </span>
        <label>
          <input
            type="text"
            defaultValue={cadastro.nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        </div>
        <div>
        <span>Telefone: </span>
        <label>
          <input
            type="text"
            defaultValue={cadastro.telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </label>
        </div>
        <div>
        <span>Email: </span>
        <label>
          <input
            type="text"
            defaultValue={cadastro.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        </div>
      </form>
      <Link to="/">
        <Button variant='success'onClick={alterarCadastro}>Alterar cadastro</Button>
      </Link>
    </div>
  );
}
