// src/components/list-detail/items/ItemsPanel.jsx
import PropTypes from "prop-types";
import ItemsHeader from "./ItemsHeader";
import ItemsGrid from "./ItemsGrid";
import AddItem from "./AddItem"

export default function ItemsPanel({
    items, onAddItem, onUpdateItem, onToggleComplete, onRemoveItem
}) {
    return (
        <>
            <ItemsHeader>
                <AddItem onAddItem={onAddItem} />
            </ItemsHeader>
            <ItemsGrid
                items={items}
                onToggle={onToggleComplete}
                onEdit={(id, payload) => onUpdateItem(id, payload)}
                onDelete={onRemoveItem}
            />
        </>
    );
}

ItemsPanel.propTypes = {
    items: PropTypes.array.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onUpdateItem: PropTypes.func.isRequired,
    onToggleComplete: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
};