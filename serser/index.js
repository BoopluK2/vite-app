import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173', // Замените на ваш домен и порт клиентского приложения
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Разрешаем передачу учетных данных (например, куки, заголовки авторизации)
    optionsSuccessStatus: 204, // Отправляем успешный статус для запросов OPTIONS
  };

// Используем middleware для обработки JSON-данных в запросах
app.use(express.json());

// Используем cookie-parser для работы с куки
app.use(cookieParser());

// Используем CORS для разрешения запросов с других доменов
app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});

// Маршруты для ресурсов пользователей и резиденций
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);


//VG2LzfySM5iR5kZP






