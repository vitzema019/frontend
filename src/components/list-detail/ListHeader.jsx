import PropTypes from "prop-types";
import BackButton from "./BackButton";
import TitleEditable from "./TitleEditable";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";
import "./ListHeader.css";

export default function ListHeader({
    title, isOwner, archived,
    onRename, onArchive, onDelete, onBack
}) {
    return (
        <header className="ld-header">
            <BackButton onClick={onBack} />
            <TitleEditable title={title} onChange={onRename} />
            <div className="ld-actions">
                {isOwner && (
                    <>
                        <ArchiveButton archived={archived} onClick={() => onArchive(!archived)} />
                        <DeleteButton onClick={onDelete} />
                    </>
                )}
            </div>
        </header>
    );
}

ListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    isOwner: PropTypes.bool,
    archived: PropTypes.bool,
    onRename: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};