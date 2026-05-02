export async function log(stack, level, pkg, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJydDQ4NTBAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMTA3NywiaWF0IjoxNzc3NzAwMTc3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2MyZGFkODAtYTEzNi00YTg5LTkzMDgtOGJhMjU4OWY4YmY0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidHVtbXVyaSByYW1lc2giLCJzdWIiOiI5N2M3MDRjMi0xY2Q5LTQ5OTUtODRkMy05YTQ2Y2ZmZWExZmEifSwiZW1haWwiOiJydDQ4NTBAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJ0dW1tdXJpIHJhbWVzaCIsInJvbGxObyI6InJhMjMxMTAwMzAxMDE4NyIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6Ijk3YzcwNGMyLTFjZDktNDk5NS04NGQzLTlhNDZjZmZlYTFmYSIsImNsaWVudFNlY3JldCI6InRjY2pqTU1rSlR1QndrTXMifQ.AfG4sAXQ8pl-vw7vciSuas80QmOssXngBd6sT-kAC3w"
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: pkg,
        message: message
      })
    });
  } catch (error) {
    console.log("Log failed:", error);
  }
}