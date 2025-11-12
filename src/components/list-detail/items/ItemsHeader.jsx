import PropTypes from "prop-types";
import "./ItemsHeader.css";

export default function ItemsHeader({ children }) {
    return (
        <div className="items-header">
            <h2>Items</h2>
            <div className="right-slot">{children}</div>
        </div>
    );
}
ItemsHeader.propTypes = { children: PropTypes.node };