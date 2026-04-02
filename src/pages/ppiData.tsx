import React, { useEffect, useState } from "react";
import PctChart from "../components/percentileChart";
import PctTable from "../components/percentileTable";
import { EconomicRecord } from "../hooks/economicData";
import MockPCTData from "../data/mockPCTdata";

const PPIData = () => {
    const [data, setData] = useState<EconomicRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false);

    const fetchPPI = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/ppi`);
            if (!response) throw new Error("No API");
            const result = await response.json();
            const transformed_data = result.data.map((item: any, i: number, arr:any[]) => ({
                date: item.date,
                actual: item.ppi_change,
                previous: i < arr.length - 1 ? arr[i + 1].ppi_change : null,
                forecast: 0
            }));
            setData(transformed_data);
        } catch (error) {
            console.error("Error fetching PPI data:", error);
            setData(MockPCTData);
        } finally {
            setLoading(false);
        }
    }

    const updatePPI = async () => {
        setUpdating(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/ppi/update`, { method: 'POST' });
            if (!response.ok) throw new Error("Update failed");
            await fetchPPI();
        } catch (error) {
            alert("Failed to update PPI data");
        } finally {
            setUpdating(false);
        }
    }

    useEffect(() => {
        fetchPPI();
    }, [])
    if (loading) {
        return <p>Loading PPI data...</p>;
    }
    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <h1>U.S. Producer Price Index YoY</h1>
                <button
                    onClick={updatePPI}
                    disabled={updating}
                    onMouseEnter={e => (e.currentTarget.style.background = "#636366")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#1C1C1E")}
                    style={{
                        padding: "6px 10px",
                        color: "#c7c7cc",
                        background: "#1C1C1E",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        WebkitAppearance: "none",
                        appearance: "none",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                        height: 32,
                        marginLeft: 24,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    {updating ? "Updating...": "Refresh"}
                </button>
            </div>
            
            <p>
                The Producer Price Index (PPI) measures the change in the price of goods sold by
                manufacturers. It is a leading indicator of consumer price inflation, which accounts
                for the majority of overall inflation. <br />
                A higher than expected reading should be taken as positive/bullish for the USD, while a lower than expected reading should be taken as negative/bearish for the USD.
            </p>
            <PctChart data = {data} />
            <h2>Recent PPI Data</h2>
            <PctTable data = {data} />
        </div>
    );
};

export default PPIData;
