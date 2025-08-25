import React from "react";
import { createRoot } from "react-dom/client";
import CookieValue from "./CookieValue";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<CookieValue />);
}

