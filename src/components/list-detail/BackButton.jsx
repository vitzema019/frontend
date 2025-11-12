import PropTypes from "prop-types";
export default function BackButton({ onClick }) {
    return <button className="btn-ghost" onClick={onClick}>←</button>;
}
BackButton.propTypes = { onClick: PropTypes.func.isRequired };