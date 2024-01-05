import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "../Properties/Properties.css";
import UserDetailContext from "../../context/UserDetailContext";

const Favourites = () => {
  // Используем хук useProperties для получения данных о свойствах
  const { data, isError, isLoading } = useProperties();

  // Создаем состояние для фильтрации свойств по названию/городу/стране
  const [filter, setFilter] = useState("");

  // Получаем информацию о избранных свойствах из контекста пользователя
  const {
    userDetails: { favourites },
  } = useContext(UserDetailContext);

  // Обработка случая, когда произошла ошибка при загрузке данных
  if (isError) {
    return (
      <div className="wrapper">
        <span>Ошибка при получении данных</span>
      </div>
    );
  }

  // Обработка случая, когда данные все еще загружаются
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

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        {/* Компонент SearchBar для фильтрации свойств */}
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data
            .filter((property) => favourites.includes(property.id))
            .filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              // Компонент PropertyCard для отображения свойства
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
