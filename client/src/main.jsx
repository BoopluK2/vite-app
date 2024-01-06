import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// Создаем "корень" (root) для рендеринга приложения
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Обертка для аутентификации Auth0 */}
    <Auth0Provider
      domain="dev-crhzpoxoktd4yxf4.us.auth0.com" // Домен Auth0
      clientId="vIM8D9oMFCHJWQpsXVlgVk6jtWGXfgin" // Идентификатор клиента Auth0
      authorizationParams={{
        redirect_uri: "https://vite-app-alpha-six.vercel.app" // Путь перенаправления после аутентификации
      }}
      audience="http://localhost:8000" // Аудитория (какой ресурс вы запрашиваете у Auth0)
      scope="openid profile email" // Запрошенные разрешения
    >
      {/* Основное приложение */}
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
