import countries from "world-countries";

// Форматируем список стран, добавляя дополнительные поля
const formattedCountries = countries.map((country) => ({
  value: country.name.common,
  label: `${country.name.common} ${country.flag}`,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  // Функция для получения всех отформатированных стран
  const getAll = () => formattedCountries;

  return { getAll };
};

export default useCountries;
