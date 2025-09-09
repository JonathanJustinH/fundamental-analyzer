import React from "react";
import "../components/table.css";

interface DataEntry {
    date: string;
    previous: number;
    actual: number;
    forecast: number;
}

interface TableProps {
    data: DataEntry[];
}

const PctTable = ({ data }: TableProps) => {
    const sortedData = [...data].sort(
        (a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 7);
    return (
        <table className="genericTable">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Actual</th>
                    <th>Forecast</th>
                    <th>Previous</th>
                    <th>Surprise</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.map((entry, index) => {
                    const surprise = entry.actual - entry.forecast;

                    return (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.actual.toLocaleString()}{entry.actual != 0 ? '%' : ''}</td>
                            <td>{entry.forecast.toLocaleString()}{entry.forecast != 0 ? '%' : ''}</td>
                            <td>{entry.previous.toLocaleString()}{entry.previous != 0 ? '%' : ''}</td>
                            <td style={{ color: surprise > 0 ? "green" : "red" }}>
                                {surprise.toLocaleString()}{surprise != 0 ? '%' : ''}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default PctTable;
