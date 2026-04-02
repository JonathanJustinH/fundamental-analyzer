import React, { useState, useEffect } from "react";
import PctTable from "../components/percentileTable";
import PctChart from "../components/percentileChart";
import { EconomicRecord } from "../hooks/economicData"
import MockPCTData from "../data/mockPCTdata";

const CPIData = () => {
    const [data, setData] = useState<EconomicRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchCPI = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/cpi`);
            if (!response.ok) throw new Error("No API");
            const result = await response.json();
            const transformed_data = result.data.map((item: any, i: number, arr:any[]) => ({
                date: item.date,
                actual: item.cpi_change,
                previous: i < arr.length - 1 ? arr[i+1].cpi_change : null,
                forecast: 0
            }));
            setData(transformed_data);
        } catch (error) {
            console.error("Error fetching CPI data:", error);
            setData(MockPCTData);
        } finally {
            setLoading(false)
        }
    }

    const updateCPI = async () => {
        setUpdating(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/cpi/update`, { method: 'POST' });
            if (!response.ok) throw new Error("Update failed");
            await fetchCPI();
        } catch (error) {
            alert("Failed to update CPI data.");
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchCPI();
    }, []);

    if (loading) {
        return <p>Loading CPI data...</p>;
    }

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ margin: 0 }}>U.S. Consumer Price Index (CPI) YoY</h1>
                <button
                    onClick={updateCPI}
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
                    {updating ? "Updating..." : "Refresh"}
                </button>
            </div>
            <p>
                The Consumer Price Index (CPI) measures the change in the price of goods and services
                from the perspective of the consumer. It is a key way to measure changes in
                purchasing trends and inflation. <br />
                A higher than expected reading should be taken as positive/bullish for the USD,
                while a lower than expected reading should be taken as negative/bearish for the USD.
            </p>
            <PctChart data = {data} />
            <h2>Recent CPI Data</h2>
            <PctTable data = {data} />
        </div>
    );
};

export default CPIData;
