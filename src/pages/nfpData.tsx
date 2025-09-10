import React, { useEffect, useState } from "react";
import NumChart from "../components/numericChart";
import NumTable from "../components/numericTable";
import { EconomicRecord } from "../hooks/economicData";
import MockNUMdata from "../data/mockNUMdata";

const NFPData = () => {
    const [data, setData] = useState<EconomicRecord[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNFP = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/nfp`);
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.nfp_change,
                    previous: i < arr.length - 1 ? arr[i + 1].nfp_change : null,
                    forecast: 0
                }));
            setData(transformed_data)
            } catch (error) {
                console.error("Error fetching NFP data:", error);
                setData(MockNUMdata);
            } finally {
                setLoading(false);
            }
        };
    fetchNFP();
    }, []);

    if (loading) {
        return <p>Loading NFP data...</p>;
    }
    return (
        <div style={{ padding: 20 }}>
            <h1>Non-Farm Payrolls (NFP) Overview</h1>
            <p>
                Nonfarm Payrolls measures the change in the number of people
                employed during the previous month, excluding the farming industry.
                Job creation is the foremost indicator of consumer spending, which accounts
                for the majority of economic activity.<br />
                A higher than expected reading should be taken as positive/bullish for the USD,
                while a lower than expected reading should be taken as negative/bearish for the USD.
            </p>
            <NumChart data = {data} unit='K' />
            <h2>Recent NFP Data</h2>
            <NumTable data = {data} unit='K' />
        </div>
    );
};

export default NFPData;
