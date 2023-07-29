import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from "react-router-dom";

import './styles.css';

const Login = () => {
  const {login} = useContext(AuthContext);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    (async () => {
      const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
      if (rememberMe != null) {
        setChecked(rememberMe);
        if(rememberMe) {
          if(localStorage.getItem("username")) {
            setUsuario(localStorage.getItem("username"));
          }
          if(localStorage.getItem("password")) {
            setPassword(localStorage.getItem("password"));
          }
        }
      }
      else {
        setChecked(false);
      }
    })()
  }, []) //Lembrete: Otimizar essa cadeia de ifs para algo de mais fácil entendimento

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("submit", {usuario, password});
    login(usuario, password);
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = () => {
    setChecked(!checked);
    localStorage.setItem("rememberMe", JSON.stringify(!checked));
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
          <button type="button" id="toogle" name="showPassword" onClick={togglePassword}>Show Password</button>
          <div className="rememberMe">
            <input type="checkbox" checked={checked} onChange={handleChange} /> Remember me
          </div>
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