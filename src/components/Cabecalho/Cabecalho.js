import { Link } from "react-router-dom";
import "./Cabecalho.css"
import circulo from "../img/circulo.png";
import aro from "../img/aro.png";

export default function Cabecalho() {
  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 className="titulo1">Guia do emprendedor</h2>
      </Link>
      <nav className="nav">
          <div className="circuloAro">
            <img src={circulo} alt="logo" className="Circulo1"/>
            <img src={aro} alt="logo" className="Aro1"/>
          </div>
          <div className="links">
        <Link to="/produtos">
          <p>Produtos</p>
        </Link>
        <Link to="/clientes" >
          <p>Clientes</p> 
        </Link>
        <Link to="/cadastrar" >
          <p>Cadastro</p>
        </Link>
        </div>
      </nav>
    </header>
  );
}
