import React from "react";
const Remote1 = React.lazy(() => import("remote1/CookieValue"));
const Remote2 = React.lazy(() => import("remote2/CookieValue"));

export default function App() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#6f42c1",
          color: "white",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h1>🏠 Shell - Microfrontend Container</h1>
        <p>
          포트 3000에서 실행 중 | Module Federation으로 Remote 앱들을 동적 로딩
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
      >
        <React.Suspense
          fallback={
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              ⏳ Remote1 로딩 중...
            </div>
          }
        >
          <Remote1 />
        </React.Suspense>

        <React.Suspense
          fallback={
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              ⏳ Remote2 로딩 중...
            </div>
          }
        >
          <Remote2 />
        </React.Suspense>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h3>💡 사용법</h3>
        <p>
          1. <strong>Auth Frontend</strong> (포트 3004)에서 로그인하여 쿠키를
          설정하세요
          <br />
          2. 위의 Remote1, Remote2 컴포넌트에서 설정된 쿠키가 자동으로
          표시됩니다
          <br />
          3. 각 마이크로앱은 독립적으로 개발/배포 가능합니다
        </p>
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#6c757d" }}>
          <a
            href={
              process.env.NODE_ENV === "production"
                ? "/auth/"
                : "http://localhost:3004"
            }
            target="_blank"
            style={{ color: "#007bff", textDecoration: "none" }}
            rel="noreferrer"
          >
            🔗 Auth Frontend 열기{" "}
            {process.env.NODE_ENV === "production" ? "(nginx)" : "(포트 3004)"}
          </a>
        </div>
      </div>
    </div>
  );
}
