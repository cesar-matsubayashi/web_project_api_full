import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlaceSubmit({ name, link });
  };

  return (
    <form className="form form_add" name="add" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <input
          type="text"
          name="name"
          id="name-input"
          className="form__input form__input_el_name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          onChange={handleNameChange}
        />
        <span className="name-input-error form__input-error"></span>

        <input
          type="url"
          name="link"
          id="link-input"
          className="form__input form__input_el_link"
          placeholder="Link da imagem"
          required
          onChange={handleLinkChange}
        />
        <span className="link-input-error form__input-error"></span>
        <button type="submit" name="submit" className="form__button">
          Criar
        </button>
      </fieldset>
    </form>
  );
}
