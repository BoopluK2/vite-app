import React from "react";
import {
  TextInput,
  Box,
  Textarea,
  Group,
  Button,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  // Инициализируем форму с начальными значениями и функциями валидации
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Должна быть больше 999 долларов." : null,
    },
  });

  const { title, description, price } = form.values;

  // Функция для обработки отправки формы
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      // Обновляем состояние с данными о недвижимости и переходим к следующему шагу
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Компоненты TextInput, Textarea и NumberInput для ввода данных */}
        <TextInput
          withAsterisk
          label="Заголовок"
          placeholder="Имя свойства"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Описание"
          label="Описание"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Цена"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        {/* Кнопки для перехода на предыдущий и следующий шаги */}
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Назад
          </Button>
          <Button type="submit">Следующий</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
