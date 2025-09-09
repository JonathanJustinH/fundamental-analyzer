import type { SentimentEntry } from "../components/summaryTable";

export function DataTransform( data: any[], name: string ): SentimentEntry[] {
    if (!data || data.length === 0) return [];
    const sortedData = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const latest = sortedData[0];
    return [{
        economicData: name,
        date: latest.date,
        actual: latest.actual,
        forecast: latest.forecast,
        previous: latest.previous,
        surprise: latest.actual - latest.forecast,
        impact: latest.actual > latest.forecast ? "Bullish" : "Bearish"
    }];
}
