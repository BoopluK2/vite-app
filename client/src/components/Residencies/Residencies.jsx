import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css"; // Импортируем стили Swiper
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from 'react-spinners'

const Residencies = () => {
  // Используем хук useProperties для получения данных о резиденциях
  const { data, isError, isLoading } = useProperties();

  // Если произошла ошибка при получении данных, отображаем сообщение об ошибке
  if (isError) {
    return (
      <div className='wrapper'>
        <span>Ошибка при получении данных</span>
      </div>
    );
  }

  // Если данные загружаются, показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Если данные успешно получены, отображаем их в карусели Swiper
  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Лучший выбор</span>
          <span className="primaryText">Популярные резиденции</span>
        </div>
        {/* Компонент Swiper отображает карусель */}
        <Swiper {...sliderSettings}>
          {/* Кнопки навигации для карусели */}
          <SlideNextButton />
          {/* Слайды карусели */}
          {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              {/* Компонент PropertyCard отображает карточку недвижимости */}
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Residencies;

// Компонент SlideNextButton - кнопки навигации для Swiper
const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      {/* Кнопка для перехода к предыдущему слайду */}
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      {/* Кнопка для перехода к следующему слайду */}
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
