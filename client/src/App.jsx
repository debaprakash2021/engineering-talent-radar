import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Checking connection...");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.message);
      })
      .catch(() => {
        setStatus("Backend Connection Failed");
      });
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <h1>Engineering Talent Radar</h1>

      <h2>{status}</h2>
    </div>
  );
}

export default App;