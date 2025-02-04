import "./InfoTooltip.css";
import PropTypes from "prop-types";

export default function InfoTooltip({ icon, message }) {
  return (
    <ul className="popup__nav">
      <li>
        <img src={icon} className="popup__signup-image" />
      </li>
      <li>
        <p className="popup__signup-caption">{message}</p>
      </li>
    </ul>
  );
}

InfoTooltip.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
};
