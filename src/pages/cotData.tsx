import React from "react";
import MockCOTData from "../data/mockCOTdata";
import CotChart from "../components/cotChart";
import CotTable from "../components/cotTable";

const CotData = () => {
    const latestData = Object.values(
        MockCOTData.reduce((acc, entry) => {
            if (
                !acc[entry.currency] ||
                new Date(entry.date) > new Date(acc[entry.currency].date)
            ) {
                acc[entry.currency] = entry;
            }
            return acc;
        }, {} as Record<string, typeof MockCOTData[number]>)
    );
    return (
        <div style={{ padding: 20 }}>
            <h1>COT Data Overview</h1>
            <p>The Commitment of Traders (COT) report is a weekly publication that shows
                the aggregate holdings of different participants in the U.S. futures market.</p>
            <h2>Net Positions by Currency</h2>
            <div className="currency-selector">
            </div>
            <CotChart data={ latestData } />
            <h2>Weekly Changes</h2>
            <CotTable data={ MockCOTData } />
        </div>
    );
};

export default CotData;
