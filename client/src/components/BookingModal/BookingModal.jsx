import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  // Стейт для выбора даты
  const [value, setValue] = useState(null);

  // Контекст для доступа к данным пользователя
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  // Обработчик успешного бронирования
  const handleBookingSuccess = () => {
    toast.success("Вы забронировали визит", {
      position: "bottom-right",
    });

    // Обновление данных пользователя после успешного бронирования
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  // Использование мутации для отправки бронирования
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Выберите дату посещения"
      centered
    >
      <div className="flexColCenter" style={{ gap: "1rem" }}>
        {/* Компонент DatePicker для выбора даты */}
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />

        {/* Кнопка для бронирования с проверкой наличия выбранной даты и состояния загрузки */}
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Забронировать посещение
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
