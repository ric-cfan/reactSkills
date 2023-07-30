import React, { useState } from 'react';

import './styles.css';
import { createUser } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/Logo2.png'
import Olho from '../../assets/eye.svg'

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
    <div id="cadastro">

      <img className='cadastro_img' src={Logo} alt="Logo do Projeto Skills"/>
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="usuario">Usuário</label>
          <input  name="usuario" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
        </div>

        <div className="senhas_olho">
          <div className="senhas">
          <label htmlFor="password">Senha</label>
          <div className="cadastro_senha">
            <input type={passwordShown ? "text" : "password"} name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="password">Confirme sua senha</label>
            <input type={passwordShown ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          </div>

          <button className='mostrar_botao' type="button" id="toogle" name="showPassword" onClick={togglePassword}>
            <img src={Olho} style={{height:25, width:25}} alt="olho" />
          </button>
        </div>

        <div className="actions">
          <button type="submit">Cadastrar</button>
        </div>
      </form>

      <div className='link_cadastrar' >
        <Link className='link'to="/login">Clique aqui para retornar</Link>
      </div>
    </div>
  );
}

export default Cadastro;