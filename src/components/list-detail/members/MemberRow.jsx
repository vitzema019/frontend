import "./MemberRow.css";

export default function MemberRow({ member, onRemove }) {
    return (
        <li className="member-row">
            <div className="avatar" aria-hidden>👤</div>
            <div className="name" title={member.name}>{member.name}</div>
            <button className="btn-ghost" onClick={onRemove} aria-label="Remove">🗑</button>
        </li>
    );
}