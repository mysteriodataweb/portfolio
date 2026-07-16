import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MorphButtonProps {
    to: string;
    children: ReactNode;
}

const MorphButton = ({ to, children }: MorphButtonProps) => {
    return (
        <Link to={to} className="morph-btn">
            <span className="morph-btn-fill" />
            <span className="morph-btn-text">
                {children}
            </span>
        </Link>
    );
};

export default MorphButton;
