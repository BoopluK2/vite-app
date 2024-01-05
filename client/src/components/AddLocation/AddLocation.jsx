import React from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  // Импортируем хук useCountries для загрузки списка стран
  const { getAll } = useCountries();

  // Создаем форму с использованием useForm из Mantine
  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
    },
    
    // Определяем функции валидации для полей формы
    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
    },
  });

  const { country, city, address } = form.values;

  // Обработчик отправки формы
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      // Обновляем состояние с деталями недвижимости и переходим к следующему шагу
      setPropertyDetails((prev) => ({ ...prev, city, address, country }));
      nextStep();
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        {/* Левая часть */}
        {/* Ввод данных */}
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Страна"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Город"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Адрес"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>

        {/* Правая часть */}
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Следующий</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
