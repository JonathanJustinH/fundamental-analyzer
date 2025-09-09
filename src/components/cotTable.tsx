import React from "react";
import "./table.css";

interface CotDataEntry {
    currency: string;
    date: string;
    long: number;
    short: number;
}

interface CotTableProps {
    data: CotDataEntry[];
}

const CotTable = ({ data }: CotTableProps) => {
    const groupedData: Record<string, CotDataEntry[]> = {};

    data.forEach(entry => {
        if (!groupedData[entry.currency]) {
            groupedData[entry.currency] = [];
        }
        groupedData[entry.currency].push(entry);
    });

    Object.keys(groupedData).forEach(currency => {
        groupedData[currency].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    });
    const sortedCurrencies = Object.keys(groupedData).sort();
    return (
        <table className="cotTable">
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Long</th>
                    <th>Short</th>
                    <th>Δ Long</th>
                    <th>Δ Short</th>
                    <th>Net</th>
                </tr>
            </thead>
            <tbody>
                {sortedCurrencies.map(currency => {
                    const [latest, prev] = groupedData[currency];
                    const deltaLong = prev ? latest.long - prev.long : 0;
                    const deltaShort = prev ? latest.short - prev.short : 0;
                    const net = latest.long - latest.short;

                    return (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{latest.long.toLocaleString()}</td>
                            <td>{latest.short.toLocaleString()}</td>
                            <td style={{ color: deltaLong >= 0 ? "green" : "red" }}>
                                {deltaLong.toLocaleString()}
                            </td>
                            <td style={{ color: deltaShort >= 0 ? "green" : "red" }}>
                                {deltaShort.toLocaleString()}
                            </td>
                            <td style={{ color: net >= 0 ? "green" : "red" }}>
                                {net.toLocaleString()}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CotTable;
