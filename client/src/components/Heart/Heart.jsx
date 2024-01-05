import { useContext, useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import useAuthCheck from "../../hooks/useAuthCheck"
import { useMutation } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import UserDetailContext from "../../context/UserDetailContext"
import { checkFavourites, updateFavourites } from "../../utils/common"
import { toFav } from "../../utils/api"

const Heart = ({ id }) => {
    // Состояние, определяющее цвет сердечка (белый или красный)
    const [heartColor, setHeartColor] = useState("white")
    const { validateLogin } = useAuthCheck() // Пользовательский хук для проверки аутентификации
    const { user } = useAuth0() // Библиотека Auth0 для доступа к данным пользователя

    const {
        userDetails: { favourites, token },
        setUserDetails,
    } = useContext(UserDetailContext) // Получение данных о избранных из контекста

    // Проверяем, находится ли элемент в избранных и устанавливаем соответствующий цвет сердечка
    useEffect(() => {
        setHeartColor(() => checkFavourites(id, favourites))
    }, [favourites])

    const { mutate } = useMutation({
        mutationFn: () => toFav(id, user?.email, token), // Вызов функции для добавления/удаления из избранных
        onSuccess: () => {
            setUserDetails((prev) => (
                {
                    ...prev,
                    favourites: updateFavourites(id, prev.favourites) // Обновление списка избранных в контексте
                }
            ))
        }
    })

    // Обработчик клика по сердечку
    const handleLike = () => {
        if (validateLogin()) // Проверка аутентификации пользователя
        {
            mutate() // Вызов мутации для добавления/удаления из избранных
            setHeartColor((prev) => prev === "#fa3e5f" ? "white" : "#fa3e5f") // Изменение цвета сердечка
        }
    }

    return (
        <AiFillHeart size={24} color={heartColor} onClick={(e) => {
            e.stopPropagation() // Предотвращение всплытия события, чтобы избежать перехода на другую страницу
            handleLike() // Вызов обработчика клика по сердечку
        }} />
    )
}

export default Heart
