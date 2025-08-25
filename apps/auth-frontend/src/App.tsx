import React, { useState } from "react";

export default function App() {
  const [cookie, setCookie] = useState("");
  const [username, setUsername] = useState("김철수");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? "/api/login"
          : "http://localhost:3003/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키를 포함하여 요청
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();
      console.log("로그인 응답:", data);

      // 쿠키 새로고침
      setCookie(document.cookie);
    } catch (error) {
      console.error("로그인 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCookies = () => {
    setCookie(document.cookie);
  };

  const clearCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
    setCookie("");
  };

  const setManualCookies = () => {
    const timestamp = new Date().toISOString();
    const sessionId = Date.now();

    // 직접 쿠키 설정 (API 호출 없이)
    document.cookie = `user=${username}; path=/; SameSite=Lax`;
    document.cookie = `loginTime=${timestamp}; path=/; SameSite=Lax`;
    document.cookie = `sessionId=${sessionId}; path=/; SameSite=Lax`;
    document.cookie = `auth-token=user=${username}; loginTime=${timestamp}; sessionId=${sessionId}; path=/; SameSite=Lax`;

    setCookie(document.cookie);
    alert(
      `✅ 쿠키를 직접 설정했습니다!\n사용자: ${username}\n시간: ${timestamp}`
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #007bff",
        borderRadius: "8px",
        margin: "10px",
      }}
    >
      <h2>🔐 Auth Frontend (포트 3004)</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="사용자 이름을 입력하세요"
          style={{ padding: "8px", marginRight: "10px", minWidth: "200px" }}
        />
        <button
          onClick={login}
          disabled={loading}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "로그인 중..." : "🚪 Login"}
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={refreshCookies}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          🔄 쿠키 새로고침
        </button>
        <button
          onClick={setManualCookies}
          style={{
            padding: "6px 12px",
            marginRight: "10px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          🍪 직접 쿠키 설정
        </button>
        <button
          onClick={clearCookies}
          style={{
            padding: "6px 12px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          🗑️ 쿠키 삭제
        </button>
      </div>

      <div
        style={{
          padding: "10px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "12px",
          minHeight: "50px",
        }}
      >
        <strong>🍪 현재 쿠키:</strong>
        <br />
        {cookie || "(쿠키가 없습니다)"}
      </div>
    </div>
  );
}
