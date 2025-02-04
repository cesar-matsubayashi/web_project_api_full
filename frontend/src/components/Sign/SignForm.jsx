import "./SignForm.css";
import { useState } from "react";
import PropTypes from "prop-types";

export default function SignForm(props) {
  const { name, title, onSubmit } = props;

  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
  };

  const formClass = `form form_sign form__${name}`;

  return (
    <form className={formClass} name={name} onSubmit={handleSubmit}>
      <h1 className="form__title form__title_sign">{title}</h1>

      <fieldset className="form__fieldset">
        <input
          type="email"
          name="email"
          id="email-input"
          className="form__input form__input_sign form__input_el_email"
          placeholder="E-mail"
          onChange={handleChange}
          required
        />
        <span className="email-input-error form__input-error"></span>

        <input
          type="password"
          name="password"
          id="password-input"
          className="form__input form__input_sign form__input_el_password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />
        <span className="password-input-error form__input-error"></span>

        <button
          type="submit"
          name="submit"
          className="form__button form__button_sign"
        >
          {title}
        </button>
      </fieldset>
    </form>
  );
}

SignForm.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
};
