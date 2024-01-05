import React from "react";
import "./Contact.css"; // Импорт стилей

// Импорт иконок для различных способов связи
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const Contact = () => {
  return (
    <div id="contact-us" className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* Левая часть с контактами и способами связи */}
        <div className="flexColStart c-left">
          <span className="orangeText">Наши контакты</span> {/* Заголовок с классом orangeText */}
          <span className="primaryText">Легко связаться с нами</span> {/* Подзаголовок с классом primaryText */}
          <span className="secondaryText">
          Мы всегда готовы помочь, предоставив вам лучшие услуги. Мы
            верьте, что хорошее место для жизни может сделать вашу жизнь лучше
          </span> {/* Текст с классом secondaryText */}

          {/* Секция с различными способами связи */}
          <div className="flexColStart contactModes">
            {/* Первая строка */}
            <div className="flexStart row">
              {/* Компонент способа связи (например, "Call") */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} /> {/* Иконка для "Call" */}
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Вызов</span> {/* Заголовок способа связи */}
                    <span className="secondaryText">99899485233</span> {/* Детали способа связи */}
                  </div>
                </div>
                <div className="flexCenter button">Позвони сейчас</div> {/* Кнопка "Call now" */}
              </div>

              {/* Компонент способа связи (например, "Chat") */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} /> {/* Иконка для "Chat" */}
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Чат</span> {/* Заголовок способа связи */}
                    <span className="secondaryText">99899485233</span> {/* Детали способа связи */}
                  </div>
                </div>
                <div className="flexCenter button">Теперь говорите</div> {/* Кнопка "Chat now" */}
              </div>
            </div>

            {/* Вторая строка */}
            <div className="flexStart row">
              {/* Компонент способа связи (например, "Video Call") */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} /> {/* Иконка для "Video Call" */}
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Видеозвонок</span> {/* Заголовок способа связи */}
                    <span className="secondaryText">998994852333</span> {/* Детали способа связи */}
                  </div>
                </div>
                <div className="flexCenter button">Видеозвонок сейчас</div> {/* Кнопка "Video Call now" */}
              </div>

              {/* Компонент способа связи (например, "Message") */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <HiChatBubbleBottomCenter size={25} /> {/* Иконка для "Message" */}
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">Сообщение</span> {/* Заголовок способа связи */}
                    <span className="secondaryText">998994852333</span> {/* Детали способа связи */}
                  </div>
                </div>
                <div className="flexCenter button">Сообщение сейчас</div> {/* Кнопка "Message now" */}
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть с изображением */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <img src="./contact.jpg" alt="" /> {/* Изображение */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
