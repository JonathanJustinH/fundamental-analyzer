import React, { useState, useEffect } from "react";
import PctChart from "../components/percentileChart";
import PctTable from "../components/percentileTable";
import { EconomicRecord } from "../hooks/economicData";
import MockPCTData from "../data/mockPCTdata";

const PCEData = () => {
    const [data, setData] = useState<EconomicRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPCE = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/pce");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.pce_change,
                    previous: i < arr.length - 1 ? arr[i + 1].pce_change : null,
                    forecast: 0
                }));
            setData(transformed_data)
            } catch (error) {
                console.error("Error fetching PCE data:", error);
                setData(MockPCTData)
            } finally {
                setLoading(false);
            }
        };
    fetchPCE();
    }, []);
    
    if (loading) {
        return <p>Loading PCE data...</p>;
    }
    return (
        <div style={{ padding: 20 }}>
            <h1>U.S. Core PCE Price Index YoY</h1>
            <p>
                The Core PCE price Index is the less volatile measure of the PCE price index which
                excludes the more volatile and seasonal food and energy prices. The impact on the
                currency may go both ways, a rise in inflation may lead to a rise in interest rates
                and a rise in local currency, on the other hand, during recession, a rise in
                inflation may lead to a deepened recession and therefore a fall in local currency.
            </p>
            <PctChart data = {data} />
            <h2>Recent PCE Data</h2>
            <PctTable data = {data} />
        </div>
    );
};

export default PCEData;
