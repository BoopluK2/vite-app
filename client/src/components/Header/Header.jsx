import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common"; // Импортируем стили меню
import useHeaderColor from "../../hooks/useHeaderColor"; // Используем хук для определения цвета фона
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Импортируем библиотеку для аутентификации
import ProfileMenu from "../ProfileMenu/ProfileMenu"; // Импортируем меню профиля пользователя
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal"; // Импортируем модальное окно для добавления недвижимости
import useAuthCheck from "../../hooks/useAuthCheck.jsx"; // Используем хук для проверки аутентификации

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false); // Состояние для открытия/закрытия меню
  const headerColor = useHeaderColor(); // Получаем цвет фона для хедера
  const [modalOpened, setModalOpened] = useState(false); // Состояние для открытия/закрытия модального окна
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0(); // Используем библиотеку Auth0 для аутентификации
  const { validateLogin } = useAuthCheck(); // Используем хук для проверки статуса аутентификации

  // Обработчик события для кнопки "Add Property", открывает модальное окно для добавления недвижимости.
  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* Логотип */}
        <Link to="/">
          <img src="./logo.png" alt="logo" width={100} />
        </Link>

        {/* Меню */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)} // Применяем стили меню в зависимости от его состояния
          >
            <NavLink to="/properties">Характеристики</NavLink> {/* Ссылка на страницу Properties */}
            <a href=" marshil1995@gmail.com">Контакт</a> {/* Ссылка на страницу Contact */}

            {/* Кнопка "Add Property" */}
            <div onClick={handleAddPropertyClick}>Добавить недвижимость</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />

            {/* Кнопка входа или меню профиля пользователя */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Авторизоваться
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>

        {/* Иконка меню для средних и маленьких экранов */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
