import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Link } from "react-router-dom";
import Logo from '../../assets/Logo2.png'
import Olho from '../../assets/eye.svg'

import './styles.css';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    (async () => {
      const rememberMe = JSON.parse(localStorage.getItem("rememberMe"));
      if (rememberMe != null) {
        setChecked(rememberMe);
        if (rememberMe) {
          if (localStorage.getItem("username")) {
            setUsuario(localStorage.getItem("username"));
          }
          if (localStorage.getItem("password")) {
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
      
        <img className='login_img' src={Logo} alt="Logo do Projeto Skills"/>
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="usuario">Usuário</label>
          <input name="usuario" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>

        <div className='login_senha'>
          <div className="field">
            <label htmlFor="password">Senha</label>
            <div className='olho_senha'>
            <input type={passwordShown ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='mostrar_botao' type="button" id="toogle" name="showPassword" onClick={togglePassword}>
              <img src={Olho} style={{height:22, width:22}} alt="olho" />
            </button>
            </div>
          </div>
        </div>

        <div className="rememberMe">
          <input type="checkbox" checked={checked} onChange={handleChange} /> 
          <p>Lembre-se de mim</p>
        </div>
        <div className="actions">
          <button type="submit">Entrar</button>
        </div>

      </form>
          <div className='link_cadastrar' >
            <Link className='link' to="/cadastro">Não possui um login? Clique aqui</Link>
          </div>

    </div>
  );
}

export default Login;