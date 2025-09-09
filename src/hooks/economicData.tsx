import { useState, useEffect } from 'react';

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
                const response = await fetch("http://127.0.0.1:8000/economic/nfp");
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
                const response = await fetch("http://127.0.0.1:8000/economic/cpi");
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
                const response = await fetch("http://127.0.0.1:8000/economic/ppi");
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
                const response = await fetch("http://127.0.0.1:8000/economic/retail_sales");
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
                const response = await fetch("http://127.0.0.1:8000/economic/initial-jobs");
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
                const response = await fetch("http://127.0.0.1:8000/economic/pce");
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
            } finally {
                setLoading(false);
            }
        };
        fetchPCE();
    }, []);

    return { data, loading };
};