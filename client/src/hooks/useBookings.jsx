import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllBookings } from "../utils/api";

const useBookings = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();
  const { user } = useAuth0();

  // Используем библиотеку react-query для выполнения запроса на сервер
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allBookings", // Уникальный ключ запроса
    queryFn: () => getAllBookings(user?.email, userDetails?.token), // Функция, выполняющая запрос на сервер
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, bookings: data })), // Обновляем контекст пользователя после успешного запроса
    enabled: user !== undefined, // Запрашиваем данные только если пользователь аутентифицирован
    staleTime: 30000, // Время (в миллисекундах), после которого данные считаются устаревшими и требуется их обновление
  });

  queryRef.current = refetch;

  useEffect(() => {
    // Выполняем запрос на сервер при изменении токена пользователя (например, после аутентификации)
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useBookings;
