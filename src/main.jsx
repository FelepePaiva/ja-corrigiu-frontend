// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom"; // ✅ adicionado aqui
import { AuthProvider } from "./contexts/AuthContext"; // ✅ já existia

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* 🔐 contexto de autenticação ao redor de tudo */}
      <BrowserRouter> {/* 🚦 roteamento em toda a aplicação */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
