import React, { useEffect, useState } from "react";
import PctChart from "../components/percentileChart";
import PctTable from "../components/percentileTable";
import { EconomicRecord } from "../hooks/economicData";
import MockPCTData from "../data/mockPCTdata";

const PPIData = () => {
    const [data, setData] = useState<EconomicRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPPI = async () => {
            try{
                const response = await fetch("http://127.0.0.1:8000/economic/ppi");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.ppi_change,
                    previous: i < arr.length - 1 ? arr[i + 1].ppi_change : null,
                    forecast: 0
                }))
            setData(transformed_data)
            } catch (error) {
                console.error("Error fetching PPI data:", error);
                setData(MockPCTData)
            } finally {
                setLoading(false);
            }
            
        }
        fetchPPI();
    }, [])
    if (loading) {
        return <p>Loading PPI data...</p>;
    }
    return (
        <div style={{ padding: 20 }}>
            <h1>U.S. Producer Price Index YoY</h1>
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
