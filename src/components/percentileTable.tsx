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
    const sortedData = [...data]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);
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
                            <td>
                                {entry.actual !== null && entry.actual !== undefined ? entry.actual.toLocaleString() : ''}
                                {entry.actual ? '%' : ''}
                            </td>
                            <td>
                                {entry.forecast !== null && entry.forecast !== undefined ? entry.forecast.toLocaleString() : ''}
                                {entry.forecast ? '%' : ''}
                            </td>
                            <td>
                                {entry.previous !== null && entry.previous !== undefined ? entry.previous.toLocaleString() : ''}
                                {entry.previous ? '%' : ''}
                            </td>
                            <td style={{ color: surprise > 0 ? "green" : "red" }}>
                                {surprise !== null && surprise !== undefined ? surprise.toLocaleString() : ''}
                                {surprise ? '%' : ''}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default PctTable;
