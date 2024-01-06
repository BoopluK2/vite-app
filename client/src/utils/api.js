import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Создание экземпляра axios с базовым URL для API
export const api = axios.create({
  baseURL: "https://vite-app-alpha-six.vercel.app",
});

// Функция для получения всех свойств (residencies)
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Что-то пошло не так getAllProperties");
    throw error;
  }
};

// Функция для получения информации о свойстве по его ID
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Что-то пошло не так getProperty");
    throw error;
  }
};

// Функция для создания пользователя
export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Что-то пошло не так. Пожалуйста, попробуйте еще раз createUser");
    throw error;
  }
};

// Функция для бронирования визита
export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Что-то пошло не так. Пожалуйста, попробуйте еще раз bookVisit");
    throw error;
  }
};

// Функция для удаления бронирования
export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Что-то пошло не так. Пожалуйста, попробуйте еще раз removeBooking");
    throw error;
  }
};

// Функция для добавления в избранное
export const toFav = async (id, email, token) => {
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

// Функция для получения всех избранных объектов
export const getAllFav = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["favResidenciesID"];
  } catch (e) {
    toast.error("Что-то пошло не так при загрузке избранного");
    throw e;
  }
};

// Функция для получения всех бронирований
export const getAllBookings = async (email, token) => {
  if (!token) return;
  try {
    const res = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data["bookedVisits"];
  } catch (error) {
    toast.error("Что-то пошло не так при получении бронирований.");
    throw error;
  }
};

// Функция для создания нового объекта (резиденции)
export const createResidency = async (data, token) => {
  console.log(data);
  try {
    const res = await api.post(
      `/residency/create`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};
