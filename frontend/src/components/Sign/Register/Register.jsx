import SignForm from "../SignForm";
import "./Register.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Register({ handleRegistration }) {
  return (
    <div className="register">
      <SignForm
        name="register"
        title="Inscrever-se"
        onSubmit={handleRegistration}
      />
      <Link className="register__signin-link" to="/signin">
        Já é um membro? Faça o login aqui!
      </Link>
    </div>
  );
}

Register.propTypes = {
  handleRegistration: PropTypes.func,
};
