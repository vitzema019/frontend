import { useState } from "react";
import PropTypes from "prop-types";

export default function InviteMemberForm({ onInvite }) {
    const [value, setValue] = useState("");
    const submit = (e) => {
        e.preventDefault();
        const v = value.trim();
        if (!v) return;
        onInvite(v);
        setValue("");
    };
    return (
        <form className="invite" onSubmit={submit}>
            <input
                placeholder="Invite user by name / email…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="btn-primary">Invite</button>
        </form>
    );
}

InviteMemberForm.propTypes = {
    onInvite: PropTypes.func.isRequired,
};