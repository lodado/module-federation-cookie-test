import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS 헤더 설정 - 모든 localhost 포트 허용
  const origin = req.headers.origin || "http://localhost:3000";
  if (origin.includes("localhost")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // OPTIONS 요청 처리
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // 사용자 정보로 JWT 같은 토큰 생성 (여기서는 간단히 사용자명 사용)
  const username = req.body?.username || "guest";
  const loginTime = new Date().toISOString();

  // 쿠키 값들을 URL 인코딩 (특수문자 문제 해결)
  const encodedUsername = encodeURIComponent(username);
  const encodedLoginTime = encodeURIComponent(loginTime);
  const sessionId = Date.now();
  const authTokenValue = encodeURIComponent(
    `user=${username}, loginTime=${loginTime}, sessionId=${sessionId}`
  );

  // 안전한 쿠키 설정
  res.setHeader("Set-Cookie", [
    `auth-token=${authTokenValue}; Path=/; SameSite=Lax; HttpOnly=false`,
    `user=${encodedUsername}; Path=/; SameSite=Lax`,
    `loginTime=${encodedLoginTime}; Path=/; SameSite=Lax`,
    `sessionId=${sessionId}; Path=/; SameSite=Lax`,
  ]);

  res.status(200).json({
    ok: true,
    message: `로그인 성공: ${username}`,
    cookies: {
      user: username,
      loginTime: loginTime,
      sessionId: sessionId,
    },
  });
}
