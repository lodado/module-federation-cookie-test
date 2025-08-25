// API 서버 상태 확인용 최소한의 페이지
export default function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <h1>🔐 Auth Server</h1>
      <p>포트 3003에서 실행 중</p>
      <div style={{ marginTop: "20px" }}>
        <h3>사용 가능한 API:</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <code>POST /api/login</code> - 로그인 및 쿠키 설정
          </li>
        </ul>
      </div>
    </div>
  );
}

