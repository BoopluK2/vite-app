import { useEffect, useState } from "react";

const useHeaderColor = () => {
  // Состояние, в котором будет храниться цвет заголовка
  const [headerColor, setHeaderColor] = useState(false);

  // Обработчик скролла, который будет вызываться при прокрутке страницы
  useEffect(() => {
    function handleScroll() {
      // Если вертикальная прокрутка больше 8 пикселей, устанавливаем цвет заголовка
      if (window.scrollY > 8) {
        setHeaderColor("#302e2e"); // Устанавливаем желаемый цвет
      } else {
        setHeaderColor("none"); // Иначе сбрасываем цвет (может быть любым другим значением)
      }
    }

    // Добавляем слушателя события скролла при монтировании компонента
    window.addEventListener("scroll", handleScroll);

    // Удаляем слушателя события скролла при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Возвращаем текущий цвет заголовка
  return headerColor;
};

export default useHeaderColor;
