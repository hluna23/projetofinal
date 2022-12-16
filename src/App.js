import { Routes, Route, BrowserRouter } from "react-router-dom";
import Cadastrar from "./components/Cadastro/Cadastrar";
import Home from "./components/Home/Home";
import Editar from "./components/Cadastro/Editar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Produtos from "./components/Produtos/Produtos";
import Clientes from "./components/Clientes/Clientes";
import CadastroUsuario from "./components/Cadastro/CadastroUsuario";
import CadastroProduto from "./components/Cadastro/CadastroProduto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario/>} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

