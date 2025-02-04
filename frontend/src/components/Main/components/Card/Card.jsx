import deleteIcon from "../../../../images/trash.svg";
import likeIcon from "../../../../images/like.svg";
import likeIconActive from "../../../../images/like-active.svg";
import ImagePopup from "../popup/components/ImagePopup/ImagePopup";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import PropTypes from "prop-types";

export default function Card(props) {
  const { handleOpenPopup, card, onCardLike, onCardDelete } = props;
  const { name, link, likes, owner } = card;
  const imagePopup = { children: <ImagePopup card={card} /> };
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `gallery__like-btn ${
    isLiked ? "gallery__like-btn_active" : ""
  }`;
  const like = isLiked ? likeIconActive : likeIcon;

  return (
    <div className="gallery__card" id="">
      <img
        onClick={() => handleOpenPopup(imagePopup)}
        src={link}
        alt={name}
        className="gallery__photo"
      />

      {currentUser._id == owner._id && (
        <img
          src={deleteIcon}
          alt="Excluir"
          className="gallery__trash"
          onClick={() => onCardDelete(card)}
        />
      )}

      <ul className="gallery__caption">
        <li className="gallery__title">{name}</li>

        <li className="gallery__like-content">
          <img
            src={like}
            alt="Like"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          />
          <p className="gallery__like-count">{likes.length}</p>
        </li>
      </ul>
    </div>
  );
}

Card.propTypes = {
  handleOpenPopup: PropTypes.func,
  card: PropTypes.object,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
};
