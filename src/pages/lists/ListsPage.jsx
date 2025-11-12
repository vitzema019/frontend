import { useNavigate } from "react-router-dom";

export default function ListsPage() {
    const navigate = useNavigate();
    // jednoduchý seznam s jedním listem
    const lists = [{ id: "L1", title: "Groceries" }];

    return (
        <div className="container">
            <h1>Shopping Lists</h1>
            <ul>
                {lists.map((l) => (
                    <li key={l.id}>
                        <button onClick={() => navigate(`/lists/${l.id}`)}>
                            Open: {l.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}