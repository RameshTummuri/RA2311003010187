import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import { log } from "../logging_middleware/logger.js";

const app = express();
app.use(cors());

app.get("/notifications", async (req, res) => {
  try {
    log("backend", "info", "route", "Fetching notifications").catch(() => {});

    const response = await fetch("http://20.207.122.201/evaluation-service/notifications", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJydDQ4NTBAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMzg3MSwiaWF0IjoxNzc3NzAyOTcxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNDVhMTgwNDYtYjkyNy00MDdlLThmYjgtYTY4YWU4ZDNlNDU0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidHVtbXVyaSByYW1lc2giLCJzdWIiOiI5N2M3MDRjMi0xY2Q5LTQ5OTUtODRkMy05YTQ2Y2ZmZWExZmEifSwiZW1haWwiOiJydDQ4NTBAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ0dW1tdXJpIHJhbWVzaCIsInJvbGxObyI6InJhMjMxMTAwMzAxMDE4NyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6Ijk3YzcwNGMyLTFjZDktNDk5NS04NGQzLTlhNDZjZmZlYTFmYSIsImNsaWVudFNlY3JldCI6InRjY2pqTU1rSlR1QndrTXMifQ.5Xz9qCjAj86RDkgk6guMzeU8OYhQrZbKjUkwVrr87p0"
      }
    });

    if (!response.ok) {
      throw new Error("External API failed");
    }

    const data = await response.json();

    const priority = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    const notifications = data.notifications || [];

    const sorted = notifications.sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = sorted.slice(0, 10);

    log("backend", "info", "service", "Returning top 10 notifications").catch(() => {});

    res.json({ notifications: top10 });

  } catch (err) {
    console.log("REAL ERROR:", err.message);

    log("backend", "error", "service", "Error fetching notifications").catch(() => {});

    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});