import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MorphButtonProps {
    to: string;
    children: ReactNode;
}

const MorphButton = ({ to, children }: MorphButtonProps) => {
    const text = typeof children === "string" ? children : null;

    return (
        <Link to={to} className="morph-btn">
            <span className="morph-btn-fill" />
            <span className="morph-btn-shadow" />
            <span className="morph-btn-text">
                {text
                    ? text.split("").map((char, i) => (
                        <span key={i} style={{ "--i": i } as React.CSSProperties}>
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))
                    : children}
            </span>
            <span className="morph-orbit-dots">
                <span />
                <span />
                <span />
                <span />
            </span>
            <span className="morph-corners">
                <span />
                <span />
                <span />
                <span />
            </span>
        </Link>
    );
};

export default MorphButton;
