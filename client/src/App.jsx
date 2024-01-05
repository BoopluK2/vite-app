import { Suspense, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property/Property";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";

function App() {
  // Создаем экземпляр QueryClient для использования в React Query
  const queryClient = new QueryClient();

  // Состояние для хранения информации о пользователе
  const [userDetails, setUserDetails] = useState({
    favourites: [], // Избранные объекты пользователя
    bookings: [],   // Бронирования пользователя
    token: null,    // Токен пользователя (если он аутентифицирован)
  });

  return (
    // Обертка для контекста пользователя
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      {/* Обертка для React Query */}
      <QueryClientProvider client={queryClient}>
        {/* Обертка для маршрутизации с помощью React Router */}
        <BrowserRouter>
          {/* Обертка для отложенной загрузки компонентов */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Общий макет (layout) приложения */}
              <Route element={<Layout />}>
                {/* Главная страница */}
                <Route path="/" element={<Website />} />
                {/* Страница свойств */}
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  {/* Страница отдельного свойства */}
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                {/* Страница бронирований */}
                <Route path="/bookings" element={<Bookings />} />
                {/* Страница избранных объектов */}
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        {/* Компонент для уведомлений */}
        <ToastContainer />
        {/* Инструменты разработчика React Query */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
