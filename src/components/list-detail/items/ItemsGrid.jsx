import { useState } from "react";
import ItemCard from "./ItemCard";
import "./ItemsGrid.css";

export default function ItemsGrid({ items, onToggle, onEdit, onDelete }) {
    const [clickCount, setClickCount] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    const handleEasterEggClick = () => {
        setClickCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= 15) {
                setShowEasterEgg(true);
                setTimeout(() => setShowEasterEgg(false), 4000);
                return 0;
            }
            return newCount;
        });
    };

    if (!items || items.length === 0) {
        return (
            <div className="empty-container">
                <p className="empty-list-msg" onClick={handleEasterEggClick}>
                    Shopping list is empty
                </p>

                {showEasterEgg && (
                    <div className="easter-egg">
                        🦄 You found the secret list guardian! ✨
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="items-grid">
            {items.map((it) => (
                <ItemCard
                    key={it.id}
                    item={it}
                    onToggle={(completed) => onToggle(it.id, completed)}
                    onEdit={(payload) => onEdit(it.id, payload)}
                    onDelete={() => onDelete(it.id)}
                />
            ))}
        </div>
    );
}