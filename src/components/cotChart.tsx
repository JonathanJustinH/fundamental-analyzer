import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface ChartProps {
    data: { 
        currency: string; 
        long: number; 
        short: number 
    }[];
}

export default function COTChart({ data }: ChartProps) {
    const chartData = data.map(item => ({
        currency: item.currency,
        netPosition: item.long - item.short
    }));

    return (
        <div style={{ width: "70%", height: 400, margin: "0 auto" }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="currency" />
                    <YAxis />
                    <Tooltip contentStyle={{ 
                        backgroundColor: "rgb(44, 44, 46)", border: "none", padding: "5px"}}
                        labelStyle={{ color: "rgb(199, 199, 204)", fontWeight: "bold" }}
                        itemStyle={{ color: "rgb(199, 199, 204)", fontSize: "14px" }}
                    />
                    <Bar dataKey="netPosition" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
