import SignForm from "../SignForm";
import "./Login.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Login({ handleLogin }) {
  return (
    <div className="login">
      <SignForm name="login" title="Entrar" onSubmit={handleLogin} />
      <Link className="login__signup-link" to="/signup">
        Ainda não é membro? Inscreva-se aqui!
      </Link>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func,
};
