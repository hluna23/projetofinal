import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cabecalho from "../Cabecalho/Cabecalho";
import "./Cadastrar.css";

export default function Criar() {
  return (
    <div>
      <div>
        <Cabecalho />
      </div>
      <div>
        <Link to="/cadastro-usuario">
          <Button  variant="line-success" >
            <b className="botoesCadastro">Cadastrar usuario </b>
          </Button>
        </Link>
        <Link to="/cadastro-produto">
          <Button variant="line-primary" >
            <b className="botoesCadastro">Cadastrar produto</b>
          </Button>
        </Link>
      </div>
    </div>
  );
}
