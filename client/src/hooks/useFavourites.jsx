import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  // Получаем контекст пользователя и детали пользователя из контекста
  const { userDetails, setUserDetails } = useContext(UserDetailContext);

  // Создаем ссылку на функцию refetch, которую будем вызывать в useEffect
  const queryRef = useRef();

  // Получаем текущего пользователя из Auth0
  const { user } = useAuth0();

  // Используем хук useQuery для запроса списка избранных объектов
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(user?.email, userDetails?.token),
    onSuccess: (data) =>
      setUserDetails((prev) => ({ ...prev, favourites: data })),
    enabled: user !== undefined, // Включаем запрос только если пользователь аутентифицирован
    staleTime: 30000, // Время, через которое данные считаются "устаревшими" и будет выполнен повторный запрос
  });

  // Присваиваем refetch текущей ссылке
  queryRef.current = refetch;

  // Вызываем refetch в useEffect, когда userDetails.token меняется
  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  // Возвращаем данные, состояния загрузки и функцию refetch
  return { data, isError, isLoading, refetch };
};

export default useFavourites;
