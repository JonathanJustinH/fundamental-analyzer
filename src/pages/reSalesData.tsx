import React, { useState, useEffect} from 'react';
import PctChart from "../components/percentileChart";
import PctTable from "../components/percentileTable";
import { EconomicRecord } from '../hooks/economicData';
import MockPCTData from '../data/mockPCTdata';

const ReSalesData = () => {
    const [data, setData] = useState<EconomicRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false);

    const fetchReSa = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/retail_sales`);
            if (!response.ok) throw new Error("No API");
            const result = await response.json();
            const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                date: item.date,
                actual: item.re_sa_change,
                previous: i < arr.length - 1 ? arr[i + 1].re_sa_change : null,
                forecast: 0
            }));
            setData(transformed_data);
        } catch (error) {
            console.error("Error fetching Retail Sales data:", error);
            setData(MockPCTData);
        } finally {
            setLoading(false);
        }
    }

    const updateReSa = async () => {
        setUpdating(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/retail_sales/update`, {method:"POST"});
            if (!response.ok) throw new Error("Update failed");
            await fetchReSa();
        } catch (error) {
            alert("Failed to update Retail Sales Data");
        } finally {
            setUpdating(false);
        }
    }

    useEffect(() => {
        fetchReSa();
    }, [])
    if (loading) {
        return <p>Loading Retail Sales data...</p>;
    }
    return(
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <h1>Retail Sales MoM Data</h1>
                <button
                    onClick={updateReSa}
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
                Retail Sales measure the change in the total value of sales at the retail level.
                It is the foremost indicator of consumer spending, which accounts for the majority
                of overall economic activity. <br />
                A higher than expected reading should be taken as positive/bullish for the USD,
                while a lower than expected reading should be taken as negative/bearish for the USD.
            </p>
            <PctChart data = { data } />
            <h2>Recent Retail Sales Data</h2>
            <PctTable data = { data } />
        </div>
    )
}

export default ReSalesData;