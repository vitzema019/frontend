import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function TitleEditable({ title, onChange }) {
    const [val, setVal] = useState(title);
    useEffect(() => setVal(title), [title]);
    return (
        <input
            value={val}
            onChange={(e) => { setVal(e.target.value); onChange?.(e.target.value); }}
            aria-label="List title"
        />
    );
}
TitleEditable.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};