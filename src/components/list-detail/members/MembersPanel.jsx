import PropTypes from "prop-types";
import InviteMemberForm from "./InviteMemberForm";
import MemberList from "./MemberList";
import "./MembersPanel.css";

export default function MembersPanel({
    members, isOwner, onInvite, onRemoveMember, onLeave
}) {
    return (
        <div className="members">
            <h3>Members</h3>
            <InviteMemberForm onInvite={onInvite} />
            <MemberList
                members={members}
                isOwner={isOwner}
                onRemoveMember={onRemoveMember}
                onLeave={onLeave}
            />
        </div>
    );
}
MembersPanel.propTypes = {
    members: PropTypes.array.isRequired,
    isOwner: PropTypes.bool,
    onInvite: PropTypes.func.isRequired,
    onRemoveMember: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
};