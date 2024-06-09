import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? "font-bold underline underline-offset-4"
                    : ""
            }
        >
            {" "}
            {children}
        </NavLink>
    );
};

export default ActiveLink;
