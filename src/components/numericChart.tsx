import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Brush } from "recharts";

interface ChartProps {
    data: { 
        date: string,
        previous: number | null;
        forecast: number | null;
        actual: number | null;
    }[];
    unit?: string;
}

export default function NumChart({ data, unit }: ChartProps) {
     const chartData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(item => ({
            date: item.date,
            previous: item.previous,
            forecast: item.forecast,
            actual: item.actual,
        }));

    return (
        <div style={{ width: "80%", height: 400, margin: "0 auto" }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ left: 40, right: 100, top: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `${value}${unit ?? ""}`} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: "rgb(44, 44, 46)", border: "none", padding: "5px"}}
                        labelStyle={{ color: "rgb(199, 199, 204)", fontWeight: "bold" }}
                        itemStyle={{ color: "rgb(199, 199, 204)", fontSize: "14px" }}
                        formatter={(value: number) => `${value.toLocaleString()}${unit ?? ""}`}
                    />
                    <Bar dataKey="actual" fill="#4f46e5" />
                    <Brush dataKey="date" height={30} stroke="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

