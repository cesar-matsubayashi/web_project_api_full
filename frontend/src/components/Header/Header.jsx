import PropTypes from "prop-types";
import logo from "../../images/logo.svg";
import hamburgerMenu from "../../images/hamburger-icon.svg";
import closeButton from "../../images/close-icon.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { removeToken } from "../../utils/token";

export default function Header({ setIsLoggedIn }) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 544);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  let headerLink;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 544);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const signOut = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isLoggedIn) {
    headerLink = (
      <ul
        className={`header__nav ${isMenuOpen ? "header__nav_isVisible" : ""}`}
      >
        <li className="header__email">{currentUser.email}</li>
        <li>
          <Link
            className="header__link header__link_signout"
            to="/signin"
            onClick={signOut}
          >
            Sair
          </Link>
        </li>
      </ul>
    );
  }

  if (location.pathname === "/signup") {
    headerLink = (
      <Link className="header__link" to="/signin">
        Faça o login
      </Link>
    );
  }

  if (location.pathname === "/signin") {
    headerLink = (
      <Link className="header__link" to="/signin">
        Entrar
      </Link>
    );
  }

  return (
    <header className="header">
      {isMobile && isLoggedIn && headerLink}
      <div className="header__container">
        <img src={logo} alt="Logo Around The US." className="header__logo" />
        {isMobile && isLoggedIn ? (
          !isMenuOpen ? (
            <img
              src={hamburgerMenu}
              alt="Menu"
              className="header__hamburger-menu"
              onClick={handleClick}
            />
          ) : (
            <img
              src={closeButton}
              alt="Menu"
              className="header__close-menu"
              onClick={handleClick}
            />
          )
        ) : (
          headerLink
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  setIsLoggedIn: PropTypes.func,
};
