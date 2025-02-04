import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatar = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  return (
    <form
      className="form form_edit-avatar"
      name="edit-avatar"
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          name="link"
          id="link-input"
          className="form__input form__input_el_link"
          placeholder="Link da imagem"
          required
          ref={avatar}
        />
        <span className="link-input-error form__input-error"></span>
        <button type="submit" name="submit" className="form__button">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
