import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./AddItem.css";

export default function AddItem({ onAddItem }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", quantity: 1, unit: "pcs", note: "" });
    const firstInputRef = useRef(null);

    // ESC zavření + auto-focus na 1. pole
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("keydown", onKey);
        firstInputRef.current?.focus();
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = form.name.trim();
        if (!name) return;
        const qty = Math.max(1, Number(form.quantity) || 1);

        onAddItem({
            name,
            quantity: qty,
            unit: form.unit.trim() || "pcs",
            note: form.note.trim(),
        });

        setForm({ name: "", quantity: 1, unit: "pcs", note: "" });
        setOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className="add-item-btn"
                onClick={() => setOpen(true)}
                aria-label="Add item"
                title="Add item"
            >
                +
            </button>

            {open && (
                <div className="modal-backdrop" onClick={() => setOpen(false)}>
                    <div
                        className="modal card"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="addItemTitle"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 id="addItemTitle">Add new item</h3>

                        <form onSubmit={handleSubmit} className="form">
                            <label className="field">
                                <span>Name</span>
                                <input
                                    ref={firstInputRef}
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Milk"
                                />
                            </label>

                            <div className="inline">
                                <label className="field">
                                    <span>Quantity</span>
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label className="field">
                                    <span>Unit</span>
                                    <input
                                        name="unit"
                                        value={form.unit}
                                        onChange={handleChange}
                                        placeholder="pcs, kg, l…"
                                    />
                                </label>
                            </div>

                            <label className="field">
                                <span>Note</span>
                                <textarea
                                    name="note"
                                    rows={2}
                                    value={form.note}
                                    onChange={handleChange}
                                    placeholder="semi-skimmed, brand…"
                                />
                            </label>

                            <div className="actions">
                                <button type="submit" className="btn-primary">Add</button>
                                <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

AddItem.propTypes = {
    onAddItem: PropTypes.func.isRequired,
};