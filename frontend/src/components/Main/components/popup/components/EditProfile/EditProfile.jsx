import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form className="form form_edit" name="edit" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          type="text"
          name="name"
          id="name-input"
          className="form__input form__input_el_name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="name-input-error form__input-error"></span>

        <input
          type="text"
          name="about"
          id="about-input"
          className="form__input form__input_el_about"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="about-input-error form__input-error"></span>
        <button type="submit" name="submit" className="form__button">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
