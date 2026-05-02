import { useEffect, useState } from "react";
import { log } from "./utils/logger";

function App() {
  const [data, setData] = useState([]);

useEffect(() => {
  log("frontend", "info", "component", "Fetching notifications");

  fetch("http://localhost:5000/notifications")
    .then((res) => res.json())
    .then((res) => {
      setData(res.notifications);
      log("frontend", "info", "component", "Notifications loaded");
    })
    .catch((err) => {
      log("frontend", "error", "api", "Failed to fetch notifications");
    });
}, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      
      <h1 onClick={() => log("frontend", "info", "component", "User clicked title")}>
        Notifications
      </h1>

      {data.length === 0 ? (
        <p>Loading or no data...</p>
      ) : (
        data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px"
            }}
          >
            <h3>{item.Type}</h3>
            <p>{item.Message}</p>
            <small>{item.Timestamp}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default App;