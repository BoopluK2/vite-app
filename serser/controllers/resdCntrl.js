import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Создание нового объекта "Residency" в базе данных
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  // Выводим данные, полученные из запроса, в консоль
  console.log(req.body.data);

  try {
    // Используем Prisma для создания новой записи Residency
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    // Отправляем успешный ответ с созданным объектом Residency
    res.send({ message: "Резиденция успешно создана", residency });
  } catch (err) {
    // Обрабатываем ошибку, возможно, связанную с дублированием адреса (P2002)
    if (err.code === "P2002") {
      throw new Error("Резиденция с таким адресом уже существует");
    }
    // В случае других ошибок выбрасываем их с сообщением
    throw new Error(err.message);
  }
});

// Получение всех записей "Residency" из базы данных
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Отправляем список всех Residency записей в ответ на запрос
  res.send(residencies);
});

// Получение конкретной записи "Residency" из базы данных по ID
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Используем Prisma для поиска уникальной записи Residency по ID
    const residency = await prisma.residency.findUnique({
      where: { id },
    });

    // Отправляем найденную запись Residency в ответ на запрос
    res.send(residency);
  } catch (err) {
    // Если произошла ошибка, выбрасываем ее с сообщением
    throw new Error(err.message);
  }
});
