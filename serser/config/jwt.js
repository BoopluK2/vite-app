import jwt from 'jsonwebtoken';

// Секретный ключ для подписи токена (храните его в безопасности)
const secretKey = 'your-secret-key';

// Функция для создания JWT-токена с пользовательскими данными
function generateToken(userData) {
  try {
    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' }); // Токен действителен 1 час
    return token;
  } catch (error) {
    // Обработка ошибки создания токена, если необходимо
    console.error('Ошибка при создании JWT-токена:', error);
    return null;
  }
}

// Пример использования функции для создания токена
const userData = {
  userId: 12345,
  username: 'example_user',
  role: 'admin'
};

const token = generateToken(userData);

if (token) {
  console.log('JWT-токен:', token);
} else {
  console.log('Не удалось создать JWT-токен.');
}
