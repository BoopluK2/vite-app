// Импортируем необходимую функцию auth из библиотеки express-oauth2-jwt-bearer
import { auth } from 'express-oauth2-jwt-bearer';

// Создаем экземпляр jwtCheck, который будет выполнять проверку JWT
const jwtCheck = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-crhzpoxoktd4yxf4.us.auth0.com",
  tokenSigningAlg: "RS256"
});






// const token = jwtCheck; // Замените на актуальный JWT токен пользователя
// fetch("http://localhost:8000/protected-route", {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// })
//   .then((response) => {
//     if (response.ok) {
//       // Если ответ успешный (статус 200), обрабатываем данные
//       return response.json(); // Преобразуем ответ в JSON
//     } else {
//       // Если есть ошибки, обрабатываем их
//       throw new Error("Ошибка при запросе к защищенному маршруту");
//     }
//   })
//   .then((data) => {
//     // Обработка данных после успешного запроса
//     console.log("Успешный ответ:", data);
//   })
//   .catch((error) => {
//     // Обработка ошибок
//     console.error("Ошибка:", error);
//   });

// app.get('/protected-route', (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Извлечение токена из заголовка
//   req.token = token; // Передача токена в следующий middleware (jwtCheck)
//   next();
// }, jwtCheck, (req, res) => {
//   // Если токен действителен, этот код будет выполнен
//   res.json({ message: 'Добро пожаловать на защищенный маршрут!' });
// });



// Экспортируем jwtCheck, чтобы его можно было использовать в других частях вашего приложения
export default jwtCheck;


