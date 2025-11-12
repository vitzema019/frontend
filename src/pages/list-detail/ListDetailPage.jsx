import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { initialList } from "../../app/data/initialList";
import { initialMembers } from "../../app/data/initialMembers";
import { initialItems } from "../../app/data/initialItems";
import ListHeader from "../../components/list-detail/ListHeader";
import MembersPanel from "../../components/list-detail/members/MembersPanel";
import ItemsPanel from "../../components/list-detail/items/ItemsPanel";
import "./ListDetailPage.css";

export default function ListDetailPage() {
    const navigate = useNavigate();

    const [list, setList] = useState(initialList);
    const [members, setMembers] = useState(initialMembers);
    const [items, setItems] = useState(initialItems);
    const loggedUserId = "U1"; // mock přihlášeného uživatele

    // --- List actions ---
    const onRename = (title) => setList((l) => ({ ...l, title }));
    const onArchive = (archived) => setList((l) => ({ ...l, archived }));
    const onDelete = () => {
        // TODO: API call
        navigate("/lists");
    };

    // --- Members actions ---
    const onInvite = (userIdOrName) =>
        setMembers((m) => [
            ...m,
            { id: `U${Date.now()}`, name: userIdOrName, role: "member" },
        ]);

    const onRemoveMember = (userId) =>
        setMembers((m) => m.filter((x) => x.id !== userId));
    const onLeave = () => onRemoveMember(loggedUserId);

    // --- Items actions ---
    // payload: { name: string, quantity?: number, unit?: string, note?: string }
    const genId = () => (window.crypto?.randomUUID?.() ?? `I${Date.now()}`);

    const onAddItem = (payload) =>
        setItems((arr) => [
            ...arr,
            {
                id: genId(),
                name: (payload?.name || "").trim() || "New item",
                quantity: Math.max(1, Number(payload?.quantity ?? 1)),
                unit: (payload?.unit || "pcs").trim(),
                note: (payload?.note || "").trim(),
                completed: false,
                createdAt: new Date().toISOString(),
            },
        ]);

    // payload může obsahovat name/quantity/unit/note/completed…
    const onUpdateItem = (itemId, payload) =>
        setItems((arr) => arr.map((it) => (it.id === itemId ? { ...it, ...payload } : it)));

    const onToggleComplete = (itemId, completed) =>
        setItems((arr) => arr.map((it) => (it.id === itemId ? { ...it, completed } : it)));

    const onRemoveItem = (itemId) =>
        setItems((arr) => arr.filter((it) => it.id !== itemId));

    const isOwner = list.ownerId === loggedUserId;

    return (
        <div className="container list-detail">
            <ListHeader
                title={list.title}
                isOwner={isOwner}
                archived={list.archived}
                onRename={onRename}
                onArchive={onArchive}
                onDelete={onDelete}
                onBack={() => navigate("/lists")}
            />

            <div className="content-layout">
                <section className="items-section card">
                    <ItemsPanel
                        items={items}
                        onAddItem={onAddItem}
                        onUpdateItem={onUpdateItem}
                        onToggleComplete={onToggleComplete}
                        onRemoveItem={onRemoveItem}
                    />
                </section>

                <aside className="sidebar card">
                    <MembersPanel
                        members={members}
                        isOwner={isOwner}
                        onInvite={onInvite}
                        onRemoveMember={onRemoveMember}
                        onLeave={onLeave}
                    />
                </aside>
            </div>
        </div>
    );
}