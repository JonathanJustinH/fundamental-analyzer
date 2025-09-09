import React from "react";
import SummaryTable from "../components/summaryTable";
import { DataTransform } from "../data/dataTransformer";
import MockPCTData from "../data/mockPCTdata";
import { useNFPData, useCPIData, usePPIData, useReSaData, usePCEData, useInitialJobData } from "../hooks/economicData";

const Home = () => {
    const { data: nfpData, loading: nfpLoading } = useNFPData();
    const { data: cpiData, loading: cpiLoading } = useCPIData();
    const { data: ppiData, loading: ppiLoading } = usePPIData();
    const { data: reSaData, loading: reSaLoading } = useReSaData();
    const { data: pceData, loading: pceLoading } = usePCEData();
    const { data: initialJobData, loading: initialJobLoading } = useInitialJobData();
    if (nfpLoading || cpiLoading || ppiLoading || reSaLoading || pceLoading || initialJobLoading) return <p>Loading Table data...</p>;

    const sentimentData = [
        ...DataTransform(nfpData, "NFP").map(e => ({ ...e, unit: "K" })),
        ...DataTransform(reSaData,"Retail Sales").map(e => ({ ...e, unit: "%" })),
        ...DataTransform(initialJobData,"Initial Jobs").map(e => ({ ...e, unit: "K" })),
        ...DataTransform(MockPCTData,"Manufacturing PMIs"),
        ...DataTransform(MockPCTData,"Services PMIs"),
        ...DataTransform(ppiData,"PPI YoY").map(e => ({ ...e, unit: "%" })),
        ...DataTransform(cpiData,"CPI YoY").map(e => ({ ...e, unit: "%" })),
        ...DataTransform(pceData,"PCE YoY").map(e => ({ ...e, unit: "%" })),
    ];
    return (
        <div style={{ padding: 20 }}>
            <h1>Home</h1>
            <p>This app will display the current market sentiment. 
                By using the sidebar menu, we can see a summarized version of the economic calendar.
                Currently this site has economic data for US only with the exception of COT data. 
                The forecast data is not yet implemented. <br />
                Currently unavailable data: COT, Services/Manufacturing PMIs
            </p>
            <h2>US Economic Heatmap</h2>
            <SummaryTable data={sentimentData}/>
        </div>
    );
}

export default Home;