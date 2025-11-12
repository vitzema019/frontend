// src/components/list-detail/items/ItemCard.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "./ItemCard.css";
import EditItemModal from "./EditItemModal";

export default function ItemCard({ item, onToggle, onEdit, onDelete }) {
    const [open, setOpen] = useState(false);

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

                <div className="title-wrap" title={`${item.name} • ${item.quantity} ${item.unit}`}>
                    <div className="title">{item.name}</div>
                    <div className="qty-badge">{item.quantity} {item.unit}</div>
                </div>

                <div className="actions">
                    <button className="btn-ghost" onClick={() => setOpen(true)} title="Edit">✎</button>
                    <button className="btn-ghost" onClick={onDelete} title="Delete">🗑</button>
                </div>
            </div>

            {item.note && <div className="note" title={item.note}>{item.note}</div>}

            <EditItemModal
                open={open}
                item={item}
                onClose={() => setOpen(false)}
                onSave={(payload) => onEdit(payload)}
            />
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
    onEdit: PropTypes.func.isRequired,   // <-- místo onRename
    onDelete: PropTypes.func.isRequired,
};