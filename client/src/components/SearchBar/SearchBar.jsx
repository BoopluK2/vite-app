import React from "react";
import { HiLocationMarker } from "react-icons/hi";

// Компонент SearchBar принимает фильтр и функцию для установки фильтра
const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="flexCenter search-bar">
      {/* Иконка маркера местоположения */}
      <HiLocationMarker color="var(--blue)" size={25} />
      {/* Поле ввода для фильтра */}
      <input
        placeholder="Поиск по названию/городу/стране..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {/* Кнопка для запуска поиска */}
      <button className="button">Поиск</button>
    </div>
  );
};

export default SearchBar;
