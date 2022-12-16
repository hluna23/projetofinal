import { Link } from "react-router-dom";
import circulo from "../img/circulo.png";
import aro from "../img/aro.png";
import "./Home.css";
export default function Home() {
  return (
    <main>
      <div className="fondo">
        <h1 className="titulo">Guia do Comercio</h1>
        <img src={circulo} alt="logo" className="Circulo" />
        <img src={aro} alt="logo" className="Aro" />
      </div>
      <div className="Menu">
        <Link to="/cadastrar">
          <p className="Btn"  variant="primary">
            Anunciantes
          </p>
        </Link>
        <Link to="/produtos">
          <p className="Btn"  variant="primary">
            Site
          </p>
        </Link>
      </div>
    </main>
  );
}
