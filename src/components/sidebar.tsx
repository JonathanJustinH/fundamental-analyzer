import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const [openCountry, setOpenCountry] = useState<string | null>(null);
    const toggleDropdown = (country: string) => {
        setOpenCountry(openCountry === country ? null : country);
    };
    const menu = [
        {
            country:"U.S.",
            items: [
                { path: "/nfp-data", label: "NFP Data" },
                { path: "/cpi-data", label: "CPI Data (YoY)" },
                { path: "/pce-data", label: "PCE Data (YoY)" },
                { path: "/ppi-data", label: "PPI Data (YoY)" },
                { path: "/manufacturing-pmi-data", label: "Manufacturing PMIs" },
                { path: "/services-pmi-data", label: "Services PMIs" },
                { path: "/retail-sales-data", label: "Retail Sales (MoM)" },
                { path: "/initial-jobs-data", label: "U.S. Initial Jobs" },
            ]
        }
    ]
    return (
        <aside className={`sidePanel ${isOpen ? "open" : ""}`}>
            <button className="closeButton" onClick={onClose}>
                ✕
            </button>
            <nav>
                <Link to="/" onClick={onClose}>Home</Link>
                <Link to="/cot-data" onClick={onClose}>COT Data</Link>
                {menu.map((section) => (
                    <div className="dropdown" key={section.country}>
                        <button className="dropdownToggle" onClick={() => toggleDropdown(section.country)}>
                            <span>{section.country}</span>
                            <span>{openCountry === section.country ? "▲" : "▼"}</span>
                        </button>
                        <div className={`dropdownMenu ${openCountry === section.country ? "open" : ""}`}>
                            {section.items.map((item) =>(
                                <Link key={item.path} to={item.path} onClick={onClose} className="dropdownItem">
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar;