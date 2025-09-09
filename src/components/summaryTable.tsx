import React from "react";
import "../components/table.css";

export interface SentimentEntry {
    economicData: string;
    date: string;
    actual: number;
    forecast: number;
    previous: number;
    surprise: number;
    impact: "Bullish" | "Bearish" | "Neutral";
    unit?: string;
}

interface SummaryProps {
    data: SentimentEntry[];
}

const SummaryTable = ({ data }: SummaryProps) => {
    const formatValue = (value: number | null, unit?: string) => {
        if (value === null || value === undefined) return "-";
        return `${value.toLocaleString()}${unit ?? ""}`;
    };
    return (
        <table className="genericTable">
            <thead>
                <tr>
                    <th>Economic data</th>
                    <th>Date</th>
                    <th>Actual</th>
                    <th>Forecast</th>
                    <th>Previous</th>
                    <th>Surprise</th>
                    <th>impact</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => {
                    return (
                        <tr key={index}>
                            <td>{entry.economicData}</td>
                            <td>{entry.date}</td>
                            <td>{formatValue(entry.actual, entry.unit)}</td>
                            <td>{formatValue(entry.forecast, entry.unit)}</td>
                            <td>{formatValue(entry.previous, entry.unit)}</td>
                            <td style={{ color: entry.surprise > 0 ? "green" : "red" }}>
                                {formatValue(entry.surprise, entry.unit)}
                            </td>
                            <td style={{ color: entry.surprise > 0 ? "green" : "red" }}>
                                {entry.impact}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default SummaryTable;
