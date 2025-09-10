import { useState, useEffect } from 'react';
import MockNUMdata from '../data/mockNUMdata';
import MockPCTData from '../data/mockPCTdata';

export interface EconomicRecord {
    date: string;
    actual: number;
    previous: number;
    forecast: number;
}

export const useNFPData = () => {
    const [data, setData] = useState<EconomicRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNFP = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/nfp");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.nfp_change,
                    previous: i < arr.length - 1 ? arr[i + 1].nfp_change : 0,
                    forecast: 0
                }));
                setData(transformed);
            } catch (err) {
                console.error("Error fetching NFP:", err);
                setData(MockNUMdata);
            } finally {
                setLoading(false);
            }
        };
        fetchNFP();
    }, []);

    return { data, loading };
};

export const useCPIData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchCPI = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/cpi");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.cpi_change,
                    previous: i < arr.length - 1 ? arr[i + 1].cpi_change : 0,
                    forecast: 0
                }));
                setData(transformed);
            } catch (err) {
                console.error("Error fetching CPI:", err);
                setData(MockPCTData);
            } finally {
                setLoading(false);
            }
        };
        fetchCPI();
    }, []);

    return { data, loading };
};

export const usePPIData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPPI = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/ppi");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.ppi_change,
                    previous: i < arr.length - 1 ? arr[i + 1].ppi_change : 0,
                    forecast: 0
                }));
                setData(transformed);
            } catch (err) {
                console.error("Error fetching PPI:", err);
                setData(MockPCTData);
            } finally {
                setLoading(false);
            }
        };
        fetchPPI();
    }, []);

    return { data, loading };
};

export const useReSaData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchReSa = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/retail_sales");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.re_sa_change,
                    previous: i < arr.length - 1 ? arr[i + 1].re_sa_change : 0,
                    forecast: 0
                }));
                setData(transformed);
            } catch (err) {
                console.error("Error fetching Retail Sales:", err);
                setData(MockPCTData);
            } finally {
                setLoading(false);
            }
        };
        fetchReSa();
    }, []);

    return { data, loading };
};

export const useInitialJobData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchInitialJob = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/initial-jobs");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.initial_job_change,
                    previous: i < arr.length - 1 ? arr[i + 1].initial_job_change : 0,
                    forecast: 0
                }));
                setData(transformed);
            } catch (err) {
                console.error("Error fetching Initial Jobs:", err);
                setData(MockNUMdata);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialJob();
    }, []);

    return { data, loading };
};

export const usePCEData = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPCE = async () => {
            try {
                const response = await fetch("${process.env.REACT_APP_API_URL}/economic/pce");
                if (!response.ok) throw new Error("No API");
                const result = await response.json();
                const transformed = result.data.map((item: any, i: number, arr: any[]) => ({
                    date: item.date,
                    actual: item.pce_change,
                    previous: i < arr.length - 1 ? arr[i + 1].pce_change : 0,
                    forecast: 0
                }));
                setData(transformed);
            } catch (err) {
                console.error("Error fetching PCE:", err);
                setData(MockPCTData);
            } finally {
                setLoading(false);
            }
        };
        fetchPCE();
    }, []);

    return { data, loading };
};