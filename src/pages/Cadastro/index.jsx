import React, { useState } from 'react';

import './styles.css';
import { createUser } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password === confirmPassword) {
      (async () => {
        const response = await createUser(usuario, password, confirmPassword);
        if(response) {
          navigate("/login");
        }
      })();
    } 
    else {
      alert("Senha e confirmar senha estão diferentes, tente novamente");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
          <input type={passwordShown ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Confirme sua senha</label>
          <input type={passwordShown ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="button" id="toogle" name="showPassword" onClick={togglePassword}>Show Password</button>
        <div className="actions">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
      <Link to="/">Retornar</Link>
    </div>
  );
}

export default Cadastro;