import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const useAuthCheck = () => {
  const { isAuthenticated } = useAuth0();

  const validateLogin = () => {
    if (!isAuthenticated) {
      // Если пользователь не аутентифицирован, выводим ошибку через toast.error
      toast.error('Вы должны быть зарегистрированы', { position: 'bottom-right' });
      return false; // Возвращаем false, чтобы указать, что аутентификация не пройдена
    } else {
      return true; // Возвращаем true, если пользователь аутентифицирован
    }
  };

  return {
    validateLogin,
  };
};

export default useAuthCheck;
