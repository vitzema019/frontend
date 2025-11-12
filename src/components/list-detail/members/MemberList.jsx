import PropTypes from "prop-types";
import MemberCard from "./MemberCard";

export default function MemberList({ members, isOwner, onRemoveMember, onLeave }) {
    return (
        <ul className="members-list">
            {members.map((u) => (
                <MemberCard
                    key={u.id}
                    user={u}
                    isOwner={isOwner}
                    onRemove={onRemoveMember}
                    onLeave={onLeave}
                />
            ))}
        </ul>
    );
}

MemberList.propTypes = {
    members: PropTypes.array.isRequired,
    isOwner: PropTypes.bool,
    onRemoveMember: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
};