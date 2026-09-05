import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./i18n/i18n";
import "./styles/tokens.css";
import "./styles/global.css";

import { App } from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { TenantProvider } from "./auth/TenantContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TenantProvider>
          <App />
        </TenantProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
