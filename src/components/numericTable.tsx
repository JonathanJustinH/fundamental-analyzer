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
    unit?: string;
}

const NumTable = ({ data, unit }: TableProps) => {
    const sortedData = [...data].sort(
        (a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 7);
    const formatValue = (value: number | null, unit?: string) => {
        if (value === null || value === undefined) return "-";
        return `${value.toLocaleString()}${unit ?? ""}`;
    };
    return (
        <table className="numTable">
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
                            <td>{formatValue(entry.actual, unit)}</td>
                            <td>{formatValue(entry.forecast, unit)}</td>
                            <td>{formatValue(entry.previous, unit)}</td>
                            <td style={{ color: surprise > 0 ? "green" : "red"}}>
                                {surprise !== null ? formatValue(surprise, unit) : '-'}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default NumTable;
