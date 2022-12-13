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
      <img src={circulo} alt="logo" className="Circulo1"/>
          <img src={aro} alt="logo" className="Aro1"/>
        <Link to="/produtos" activeClassName="active">
          <p>productos</p>
        </Link>
        <Link to="/cadastrar" className="linkC">
          <p>cadastro</p>
        </Link>
        <Link to="/clientes" style={{ textDecoration: 'none' }} >
          <p>clientes</p> 
        </Link>
      </nav>
    </header>
  );
}
