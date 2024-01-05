import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  // Используем хук useForm для управления формой
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    // Устанавливаем валидацию для полей формы
    validate: {
      bedrooms: (value) => (value < 1 ? "Должна быть хотя бы одна комната" : null),
      bathrooms: (value) =>
        value < 1 ? "Должна быть хотя бы одна ванная комната" : null,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  // Обработчик отправки формы
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      // Обновляем состояние свойства с новыми данными
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      // Вызываем мутацию для отправки данных на сервер
      mutate();
    }
  };

  // ==================== Логика отправки данных на сервер
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency({
        ...propertyDetails,
        facilities: { bedrooms, parkings, bathrooms },
      }, token),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Добавлено успешно", { position: "bottom-right" });
      // Сбрасываем состояние формы и закрываем модальное окно
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      // Запрашиваем обновленные данные с сервера
      refetchProperties();
    }
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="Количество спален"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="Количество парковок"
          min={0}
          {...form.getInputProps("parkings")}
        />
        <NumberInput
          withAsterisk
          label="Количество ванных комнат"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Назад
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Отправка" : "Добавить недвижимость"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
