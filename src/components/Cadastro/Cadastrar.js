import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import './ValidarForm'

export default function Criar() {
  return (
    <div>
      <Cabecalho />
      <br/>
      <Link to='/cadastro-usuario'>
      <Button variant="outline-success"> Cadastrar usuario </Button>
      </Link>
      <Link to='/cadastro-produto'>
      <Button variant="outline-primary"> Cadastrar produto </Button>
      </Link>
    </div>
  );
};