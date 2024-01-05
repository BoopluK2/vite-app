import express from "express";
import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFavorites, toFav } from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

// Маршрут для регистрации нового пользователя, требующий аутентификации JWT
router.post("/register", jwtCheck, createUser);

// Маршрут для бронирования визита к резиденции по её ID, требующий аутентификации JWT
router.post("/bookVisit/:id", jwtCheck, bookVisit);

// Маршрут для получения всех бронирований пользователя, требующий аутентификации JWT
router.post("/allBookings", jwtCheck, getAllBookings);

// Маршрут для отмены бронирования по ID, требующий аутентификации JWT
router.post("/removeBooking/:id", jwtCheck, cancelBooking);

// Маршрут для добавления/удаления резиденции из списка избранных, требующий аутентификации JWT
router.post("/toFav/:rid", jwtCheck, toFav);

// Маршрут для получения списка избранных резиденций пользователя, требующий аутентификации JWT
router.post("/allFav/", jwtCheck, getAllFavorites);

export { router as userRoute };
