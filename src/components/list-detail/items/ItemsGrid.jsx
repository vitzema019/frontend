import ItemCard from "./ItemCard";
import "./ItemsGrid.css";

export default function ItemsGrid({ items, onToggle, onRename, onDelete }) {
    return (
        <div className="items-grid">
            {items.map((it) => (
                <ItemCard
                    key={it.id}
                    item={it}
                    onToggle={(completed) => onToggle(it.id, completed)}   // <— pošli completed
                    onRename={(name) => onRename(it.id, name)}
                    onDelete={() => onDelete(it.id)}
                />
            ))}
        </div>
    );
}