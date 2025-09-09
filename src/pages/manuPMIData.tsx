import React from "react";
import MockPCTData from "../data/mockPCTdata";
import PctTable from "../components/percentileTable";
import PctChart from "../components/percentileChart";

const ManuPMIData = () => {
    const data = Object.values(MockPCTData)
    return (
        <div style={{ padding: 20 }}>
            <h1>U.S. ISM Manufacturing Purchasing Managers Index (PMI)</h1>
            <p>
                The Institute of Supply Management (ISM) Manufacturing Purchasing Managers Index
                (PMI) Report on Business is based on data compiled from monthly replies to questions
                asked of purchasing and supply executives in over 400 industrial companies. For each
                of the indicators measured (New Orders, Backlog of Orders, New Export Orders, Imports,
                Production, Supplier Deliveries, Inventories, Customers Inventories, Employment, and Prices),
                this report shows the percentage reporting each response, the net difference between the number
                of responses in the positive economic direction and the negative economic direction and the
                diffusion index. Responses are raw data and are never changed. <br /><br />

                The diffusion index includes the percent of positive responses plus one-half of those
                responding the same (considered positive). The resulting single index number is then
                seasonally adjusted to allow for the effects of repetitive intra-year variations resulting
                primarily from normal differences in weather conditions, various institutional arrangements,
                and differences attributable to non-moveable holidays. All seasonal adjustment factors are
                supplied by the U.S. Department of Commerce and are subject annually to relatively minor
                changes when conditions warrant them. <br />

                The PMI is a composite index based on the seasonally adjusted diffusion indices for five of
                the indicators with varying weights: New Orders --30% Production --25% Employment
                --20% Supplier Deliveries --15% and Inventories -- 10%. <br /><br />

                A higher than expected reading should be taken as positive/bullish for the USD,
                while a lower than expected reading should be taken as negative/bearish for the USD.
            </p>
            <PctChart data = {data} />
            <h2>Recent Manufacturing PMI Data</h2>
            <PctTable data = {MockPCTData} />
        </div>
    );
};

export default ManuPMIData;
