import React, { useEffect, useState } from "react";

type SentimentResponse = {
  sentiment: "Bullish" | "Bearish" | "Neutral";
  score?: number;
  explanation?: string;
};

const badgeColor = (label: string) =>
  label === "Bullish" ? "green" : label === "Bearish" ? "red" : "#6b7280";

const AISentiment: React.FC = () => {
  const [data, setData] = useState<SentimentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSentiment = async () => {
    setLoading(true);
    setError(null);
    try {
        const base = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");
        const payload = {}; 
        const res = await fetch(`${base}/sentiment/USD`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${txt}`);
        }
        const json: SentimentResponse = await res.json();
        setData(json);
    } catch (e: any) {
        setError(e.message || "Unknown error");
        setData(null);
    } finally {
        setLoading(false);
    }
    };

  useEffect(() => {
    fetchSentiment();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: "95%"}}>
      <header>
        <h1>USD Sentiment Summary</h1>
      </header>

      {loading && <p>Loading AI sentiment...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <section style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                background: badgeColor(data.sentiment),
                color: "#c7c7cc",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {data.sentiment.toUpperCase()}
            </div>
            {typeof data.score === "number" && (
              <div style={{ color: "#c7c7cc" }}>Confidence: {(data.score * 100).toFixed(0)}%</div>
            )}
            <button
                onClick={fetchSentiment}
                disabled={loading}
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
                    transition: "background 0.2s ease"
                }}>
            Refresh
            </button>
          </div>

          <div style={{ marginTop: 16, color: "#111827", lineHeight: 1.6 }}>
            {data.explanation ? (
              data.explanation.split(/\n\s*\n/).map((p, i) => (
                <p key={i} style={{ marginTop: i === 0 ? 0 : 12 }}>
                  {p}
                </p>
              ))
            ) : (
              <p>No explanation provided.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default AISentiment;