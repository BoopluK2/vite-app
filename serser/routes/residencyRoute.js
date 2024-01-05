import express from "express";
import { createResidency, getAllResidencies, getResidency } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

// Маршрут для создания новой резиденции, требующий аутентификации JWT
router.post("/create", createResidency);

// Маршрут для получения списка всех резиденций
router.get("/allresd", getAllResidencies);

// Маршрут для получения конкретной резиденции по её ID
router.get("/:id", getResidency);

export { router as residencyRoute };
