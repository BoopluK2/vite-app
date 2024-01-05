import React from "react";
import "./GetStarted.css";

// Компонент GetStarted содержит информацию о том, как пользователи могут начать использовать ваш сервис и подписаться на него.
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          {/* Заголовок, который призывает пользователей начать использование сервиса */}
          <span className="primaryText">Начни работу с &&</span>
          
          {/* Текст, который описывает, как пользователи могут воспользоваться сервисом */}
          <span className="secondaryText">
          Подпишитесь и получайте от нас суперпривлекательные ценовые предложения.
            <br />
            Найдите свое жилье скорее
          </span>

          {/* Кнопка, которая перенаправляет пользователя на адрес электронной почты для начала взаимодействия с сервисом */}
          <button className="button" href>
            <a href="marshil1995@gmail.com">Начать</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
