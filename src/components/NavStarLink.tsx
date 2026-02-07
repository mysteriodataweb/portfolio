import { Link, useLocation } from "react-router-dom";

const StarSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        version="1.1"
        style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "auto",
            fillRule: "evenodd",
            clipRule: "evenodd",
        }}
        viewBox="0 0 784.11 815.53"
    >
        <g>
            <path
                className="nav-star-fill"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
            />
        </g>
    </svg>
);

interface NavStarLinkProps {
    to: string;
    label: string;
}

const NavStarLink = ({ to, label }: NavStarLinkProps) => {
    const location = useLocation();
    const isActive = location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            className={`nav-star-btn ${isActive ? "nav-star-btn--active" : ""}`}
        >
            {label}
            <div className="nav-star nav-star-1"><StarSVG /></div>
            <div className="nav-star nav-star-2"><StarSVG /></div>
            <div className="nav-star nav-star-3"><StarSVG /></div>
            <div className="nav-star nav-star-4"><StarSVG /></div>
            <div className="nav-star nav-star-5"><StarSVG /></div>
            <div className="nav-star nav-star-6"><StarSVG /></div>
        </Link>
    );
};

export default NavStarLink;
