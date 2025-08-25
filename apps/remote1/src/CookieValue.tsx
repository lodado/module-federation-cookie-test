import React, { useState, useEffect } from "react";

export function CookieValue() {
  const [cookies, setCookies] = useState("");
  const [parsedCookies, setParsedCookies] = useState<Record<string, string>>(
    {}
  );

  const refreshCookies = () => {
    const cookieString = document.cookie;
    setCookies(cookieString);

    // 쿠키 파싱
    const parsed: Record<string, string> = {};
    cookieString.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name && value) {
        parsed[name] = decodeURIComponent(value);
      }
    });
    setParsedCookies(parsed);
  };

  useEffect(() => {
    refreshCookies();
    // 1초마다 쿠키 자동 새로고침
    const interval = setInterval(refreshCookies, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "15px",
        border: "2px solid #28a745",
        borderRadius: "8px",
        margin: "10px",
        backgroundColor: "#f8fff8",
      }}
    >
      <h3>🟢 Remote1 MicroApp (포트 3001)</h3>

      <button
        onClick={refreshCookies}
        style={{
          padding: "6px 12px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        🔄 쿠키 새로고침
      </button>

      <div
        style={{
          padding: "10px",
          backgroundColor: "#ffffff",
          border: "1px solid #28a745",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <strong>📦 원본 쿠키 문자열:</strong>
        <br />
        <code style={{ fontSize: "11px", wordBreak: "break-all" }}>
          {cookies || "(쿠키가 없습니다)"}
        </code>
      </div>

      {Object.keys(parsedCookies).length > 0 && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffffff",
            border: "1px solid #28a745",
            borderRadius: "4px",
          }}
        >
          <strong>🍪 파싱된 쿠키들:</strong>
          <br />
          {Object.entries(parsedCookies).map(([key, value]) => (
            <div key={key} style={{ margin: "5px 0", fontSize: "12px" }}>
              <span style={{ fontWeight: "bold", color: "#28a745" }}>
                {key}:
              </span>{" "}
              <span style={{ fontFamily: "monospace" }}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CookieValue;
