import "./styles.css";

import { AuthContext } from "../../contexts/auth";
import { useContext } from "react";
import Logo from "../../assets/Logo2.png"
import Logout from "../../assets/logout.svg"

function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="header__container">
        <div className="header__lado-esquerdo">
          <img
            className="header__img"
            src={Logo}
            alt="Logo do Projeto"
          />
        </div>

          <p className="header__texto">Bem vindo, {localStorage.getItem("username")}!</p>
          <button onClick={logout} className="header__botao">
            <img className="header__botao-icone" src={Logout} style={{height:40, width:40}} alt="ícone de Sair" />
          </button>
      </div>
    </>
  );
}

export default Header;