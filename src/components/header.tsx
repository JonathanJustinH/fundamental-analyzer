import React from "react";
import "./header.css";

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <div className="header">
            <button className="menuButton" onClick={onMenuClick}>
                ☰
            </button>
            <h2>Forex Sentiment Dashboard</h2>
        </div>
    )
}

export default Header;
