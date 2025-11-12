import PropTypes from "prop-types";
export default function ArchiveButton({ archived, onClick }) {
    return (
        <button className="btn-ghost" onClick={onClick}>
            {archived ? "Unarchive" : "Archive"}
        </button>
    );
}
ArchiveButton.propTypes = {
    archived: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};