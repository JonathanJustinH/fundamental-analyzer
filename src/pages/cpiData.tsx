import React, { useState, useEffect } from "react";
import PctTable from "../components/percentileTable";
import PctChart from "../components/percentileChart";
import { EconomicRecord } from "../hooks/economicData"
import MockPCTData from "../data/mockPCTdata";

const CPIData = () => {
    const [data, setData] = useState<EconomicRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCPI = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/economic/cpi");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.cpi_change,
                    previous: i < arr.length - 1 ? arr[i + 1].cpi_change : null,
                    forecast: 0
                }));
            setData(transformed_data)
            } catch (error) {
                console.error("Error fetching CPI data:", error);
                setData(MockPCTData)
            } finally {
                setLoading(false);
            }
        };
    fetchCPI();
    }, []);
    
    if (loading) {
        return <p>Loading CPI data...</p>;
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>U.S. Consumer Price Index (CPI) YoY</h1>
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
