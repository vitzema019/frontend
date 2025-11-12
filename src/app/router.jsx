import { createBrowserRouter } from "react-router-dom";
import ListsPage from "../pages/lists/ListsPage";
import ListDetailPage from "../pages/list-detail/ListDetailPage";

export const router = createBrowserRouter([
    { path: "/lists", element: <ListsPage /> },
    { path: "/lists/:listId", element: <ListDetailPage /> },
    { path: "*", element: <ListsPage /> },
]);