import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = () => {
    setLoading(true);
    setError("");

    fetch("http://localhost:5000/notifications")
      .then((res) => res.json())
      .then((res) => {
        setData(res.notifications || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load notifications");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getColor = (type) => {
    if (type === "Placement") return "#22c55e";
    if (type === "Result") return "#3b82f6";
    return "#f59e0b";
  };

  const filteredData = data
    .filter((item) =>
      item.Message.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      filter === "All" ? true : item.Type === filter
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Notifications</h1>

      {/* 🔍 SEARCH */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <input
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
          }}
        />
      </div>

      {/* 🔘 FILTERS */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        {["All", "Placement", "Result", "Event"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              margin: "5px",
              padding: "8px 15px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: filter === type ? "#3b82f6" : "#1e293b",
              color: "white",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 🔄 REFRESH */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={fetchData}
          style={{
            padding: "8px 15px",
            borderRadius: "8px",
            border: "none",
            background: "#22c55e",
            color: "white",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>

      {/* 📊 COUNT */}
      <p style={{ textAlign: "center", color: "#94a3b8" }}>
        Showing {filteredData.length} notifications
      </p>

      {/* ⏳ LOADING */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* ❌ ERROR */}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

      {/* 📦 DATA */}
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        {filteredData.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#1e293b",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "12px",
              borderLeft: `5px solid ${getColor(item.Type)}`,
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            {/* 🏷️ BADGE */}
            <span
              style={{
                background: getColor(item.Type),
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            >
              {item.Type}
            </span>

            <p style={{ margin: "10px 0" }}>{item.Message}</p>

            <small style={{ color: "#94a3b8" }}>
              {new Date(item.Timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;