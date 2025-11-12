// src/components/list-detail/items/ItemCard.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "./ItemCard.css";

export default function ItemCard({ item, onToggle, onRename, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(item.name);

    const submitEdit = (e) => {
        e.preventDefault();
        const v = name.trim();
        if (!v) return;
        onRename(v);
        setEditing(false);
    };

    return (
        <div className={`item-card ${item.completed ? "is-done" : ""}`}>
            <div className="row top">
                <label className="check">
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => onToggle(e.target.checked)}
                        aria-label="Mark as completed"
                    />
                </label>

                {!editing ? (
                    <div className="title-wrap" title={`${item.name} • ${item.quantity} ${item.unit}`}>
                        <div className="title">{item.name}</div>
                        <div className="qty-badge">{item.quantity} {item.unit}</div>
                    </div>
                ) : (
                    <form onSubmit={submitEdit} className="edit-form">
                        <input value={name} onChange={(e) => setName(e.target.value)} autoFocus />
                        <button className="btn-primary" type="submit">Save</button>
                        <button className="btn-ghost" type="button" onClick={() => { setEditing(false); setName(item.name); }}>
                            Cancel
                        </button>
                    </form>
                )}

                {!editing && (
                    <div className="actions">
                        <button className="btn-ghost" onClick={() => setEditing(true)} title="Edit">✎</button>
                        <button className="btn-ghost" onClick={onDelete} title="Delete">🗑</button>
                    </div>
                )}
            </div>

            {item.note && <div className="note" title={item.note}>{item.note}</div>}
        </div>
    );
}

ItemCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
        note: PropTypes.string,
        completed: PropTypes.bool,
    }).isRequired,
    onToggle: PropTypes.func.isRequired,
    onRename: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};