// src/components/list-detail/items/EditItemModal.jsx
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../items/AddItem.css"; // zrecyklujeme modal styly

export default function EditItemModal({ open, item, onClose, onSave }) {
    const [form, setForm] = useState({
        name: item?.name ?? "",
        quantity: item?.quantity ?? 1,
        unit: item?.unit ?? "pcs",
        note: item?.note ?? "",
    });
    const firstRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        firstRef.current?.focus();
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    useEffect(() => {
        // když se otevře s jiným itemem
        if (item) {
            setForm({
                name: item.name ?? "",
                quantity: item.quantity ?? 1,
                unit: item.unit ?? "pcs",
                note: item.note ?? "",
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        const name = form.name.trim();
        if (!name) return;
        onSave({
            name,
            quantity: Math.max(1, Number(form.quantity) || 1),
            unit: (form.unit || "pcs").trim(),
            note: (form.note || "").trim(),
        });
        onClose();
    };

    if (!open) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div
                className="modal card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="editItemTitle"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 id="editItemTitle">Edit item</h3>
                <form onSubmit={submit} className="form">
                    <label className="field">
                        <span>Name</span>
                        <input ref={firstRef} name="name" value={form.name} onChange={handleChange} required />
                    </label>

                    <div className="inline">
                        <label className="field">
                            <span>Quantity</span>
                            <input type="number" min="1" step="1" name="quantity" value={form.quantity} onChange={handleChange} />
                        </label>
                        <label className="field">
                            <span>Unit</span>
                            <input name="unit" value={form.unit} onChange={handleChange} placeholder="pcs, kg, l…" />
                        </label>
                    </div>

                    <label className="field">
                        <span>Note</span>
                        <textarea rows={2} name="note" value={form.note} onChange={handleChange} />
                    </label>

                    <div className="actions">
                        <button type="submit" className="btn-primary">Save</button>
                        <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditItemModal.propTypes = {
    open: PropTypes.bool.isRequired,
    item: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};