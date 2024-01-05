import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavourites from "../../hooks/useFavourites";
import useBookings from "../../hooks/useBookings";


const Layout = () => {
  // Используйте хуки useFavourites и useBookings для загрузки данных о избранных объектах и бронированиях пользователя.
  useFavourites();
  useBookings();

  // Получите информацию о аутентификации из Auth0.
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Создайте мутацию с использованием useMutation для создания пользователя.
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    // Функция для получения токена и регистрации пользователя.
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
        },
      });

      // Сохраните токен в локальном хранилище.
      localStorage.setItem("access_token", res);

      // Обновите информацию о пользователе с токеном и вызовите мутацию для создания пользователя.
      setUserDetails((prev) => ({ ...prev, token: res }));
      console.log(res)
      mutate(res);
    };

    // Если пользователь аутентифицирован, получите токен и зарегистрируйте его.
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        {/* Вставьте компонент Header и Outlet для маршрутизации. */}
        
        <Header />
        <Outlet />
      </div>
      {/* Добавьте компонент Footer. */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
