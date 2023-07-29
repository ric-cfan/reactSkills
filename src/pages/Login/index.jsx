import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from "react-router-dom";

import './styles.css';

const Login = () => {
  const {login} = useContext(AuthContext);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", {usuario, password});
    login(usuario, password);
  }

  return (
    <div id="login">
      <h1 className="title">Login do sistema</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="usuario">Usuário</label>
          <input  name="usuario" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="actions">
          <button type="submit">Entrar</button>
        </div>
      </form>
      <Link to="/cadastro">Cadastrar</Link>
    </div>
  );
}

export default Login;