import React, { useState } from 'react';

import './styles.css';
import { createUser } from '../../services/api';
import { Link } from 'react-router-dom';

const Cadastro = () => {

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const response = await createUser(usuario, password, confirmPassword);
    })();
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
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="actions">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      <Link to="/">Retornar</Link>
    </div>
  );
}

export default Cadastro;