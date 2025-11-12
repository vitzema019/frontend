import PropTypes from "prop-types";

export default function DeleteButton({ onClick }) {
    return (
        <button
            className="btn-danger"
            onClick={() => {
                if (window.confirm("Delete this list?")) onClick();
            }}
        >
            Delete
        </button>
    );
}

DeleteButton.propTypes = { onClick: PropTypes.func.isRequired };