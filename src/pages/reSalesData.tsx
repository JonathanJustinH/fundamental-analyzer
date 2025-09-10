import React, { useState, useEffect} from 'react';
import PctChart from "../components/percentileChart";
import PctTable from "../components/percentileTable";
import { EconomicRecord } from '../hooks/economicData';
import MockPCTData from '../data/mockPCTdata';

const ReSalesData = () => {
    const [data, setData] = useState<EconomicRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReSa = async () => {
            try{
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/retail_sales");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.re_sa_change,
                    previous: i < arr.length - 1 ? arr[i + 1].re_sa_change : null,
                    forecast: 0
                }))
            setData(transformed_data)
            } catch (error) {
                console.error("Error fetching Retail Sales data:", error);
                setData(MockPCTData)
            } finally {
                setLoading(false);
            }
            
        }
        fetchReSa();
    }, [])
    if (loading) {
        return <p>Loading Retail Sales data...</p>;
    }
    return(
        <div style={{ padding: 20 }}>
            <h1>Retail Sales MoM Data</h1>
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