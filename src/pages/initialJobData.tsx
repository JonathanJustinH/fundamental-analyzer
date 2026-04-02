import React, { useEffect, useState } from "react";
import NumChart from "../components/numericChart";
import NumTable from "../components/numericTable";
import { EconomicRecord } from "../hooks/economicData";
import MockNUMdata from "../data/mockNUMdata";

const InitalJobsData = () => {
    const [data, setData] = useState<EconomicRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const fetchInitialJob = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/initial-jobs`);
            if (!response.ok) throw new Error("No API");
            const result = await response.json();
            const transformed_data = result.data.map((item: any, i: number, arr: any[]) => ({
                date: item.date,
                actual: item.initial_job_change,
                previous: i < arr.length - 1 ? arr[i + 1].initial_job_change : null,
                forecast: 0
            }));
            setData(transformed_data);
        } catch (error) {
            console.error("Error fetching Initial Jobs data:", error)
            setData(MockNUMdata);
        } finally {
            setLoading(false);
        }
        
    }

    const updateInitialJob = async () => {
        setUpdating(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/economic/initial-jobs/update`, { method: "POST" });
            if (!response) throw new Error("Update failed");
            await fetchInitialJob();
        } catch (error) {
            alert("Failed to update Initial Jobs data")
        } finally {
            setUpdating(false);
        }
    }


    useEffect(() => {
        fetchInitialJob();
    }, []);
    
        if (loading) {
            return <p>Loading Initial Jobs data...</p>;
        }
    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
                <h1>U.S. Initial Jobless Claims</h1>
                <button
                    onClick={updateInitialJob}
                    disabled={updating}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#636366")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1C1E")}
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
                Initial Jobless Claims measures the number of individuals who filed for unemployment
                insurance for the first time during the past week. This is the earliest U.S. economic
                data, but the market impact varies from week to week. <br />
                A higher than expected reading should be taken as negative/bearish for the USD,
                while a lower than expected reading should be taken as positive/bullish for the USD.
            </p>
            <NumChart data = {data} unit="K" />
            <h2>Recent Initial Jobs Data</h2>
            <NumTable data = {data} unit="K" />
        </div>
    );
};

export default InitalJobsData;
