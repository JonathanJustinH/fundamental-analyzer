import React from "react";
import MockPCTData from "../data/mockPCTdata";
import PctTable from "../components/percentileTable";
import PctChart from "../components/percentileChart";

const ServPMIData = () => {
    const data = Object.values(MockPCTData)
    return (
        <div style={{ padding: 20 }}>
            <h1>U.S. ISM Non-Manufacturing Purchasing Managers Index</h1>
            <p>
                The Institute of Supply Management (ISM) Non-Manufacturing Purchasing Managers'
                Index (PMI) (also known as the ISM Services PMI) report on Business, a composite
                index is calculated as an indicator of the overall economic condition for the
                non-manufacturing sector. The NMI is a composite index based on the diffusion
                indexes for four of the indicators with equal weights: Business Activity
                (seasonally adjusted), New Orders (seasonally adjusted),
                Employment (seasonally adjusted) and Supplier Deliveries. <br />

                A reading above 50 percent indicates the non-manufacturing sector economy is
                generally expanding; below 50 percent indicates the non-manufacturing sector is
                generally contracting. The Non-Manufacturing ISM Report on Business is based on
                data compiled from monthly replies to questions asked of more than 370 purchasing
                and supply executives in over 62 different industries representing nine divisions
                from the Standard Industrial Classification (SIC) categories. Membership of the
                Business Survey Committee is diversified by SIC category and is based on each
                industry contribution to Gross Domestic Product (GDP). <br /><br />

                A higher than expected reading should be taken as positive/bullish for the USD,
                while a lower than expected reading should be taken as negative/bearish for the USD.
            </p>
            <PctChart data = {data} />
            <h2>Recent Services PMI Data</h2>
            <PctTable data = {MockPCTData} />
        </div>
    );
};

export default ServPMIData;
