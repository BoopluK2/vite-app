import React from "react";
import { useQuery } from "react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  // Используем хук useQuery для выполнения запроса на получение всех свойств
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties", // Уникальный ключ запроса
    getAllProperties, // Функция, которая выполняет запрос
    { refetchOnWindowFocus: false } // Опции запроса
  );

  // Возвращаем объект с данными о свойствах и состоянием запроса
  return {
    data,      // Данные о свойствах
    isError,   // Флаг, указывающий на наличие ошибки
    isLoading, // Флаг, указывающий на загрузку данных
    refetch,   // Функция для повторного выполнения запроса
  };
};

export default useProperties;
