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
            <h2>Currency Fundamental Analyzer</h2>
        </div>
    )
}

export default Header;
