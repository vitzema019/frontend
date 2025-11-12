import PropTypes from "prop-types";
import "./MemberRow.css";

export default function MemberCard({ user, isOwner, onRemove, onLeave }) {
    return (
        <li className="member-row">
            <div className="avatar" aria-hidden>👤</div>
            <div className="name" title={user.name}>{user.name}</div>
            {isOwner ? (
                <button className="btn-ghost" onClick={() => onRemove(user.id)} title="Remove">🗑</button>
            ) : (
                <button className="btn-ghost" onClick={onLeave} title="Leave">Leave</button>
            )}
        </li>
    );
}

MemberCard.propTypes = {
    user: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
    isOwner: PropTypes.bool,
    onRemove: PropTypes.func.isRequired,
    onLeave: PropTypes.func,
};