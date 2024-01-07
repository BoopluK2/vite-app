import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Левая часть */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            {/* Анимированный заголовок */}
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Обнаружить <br />
              Самый подходящий
              <br /> Недвижимость
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Найти различные объекты недвижимости, которые вам подходят, очень легко</span>
            <span>Забудьте обо всех трудностях с поиском для вас жилья</span>
          </div>

          {/* Поисковая панель */}
          <SearchBar />

          {/* Статистика */}
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Премиум-продукт</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Счастливый клиент</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Награды</span>
            </div>
          </div>
        </div>

        {/* Правая часть */}
        <div className="flexCenter hero-right">
          {/* Анимированное изображение */}
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src="./hero-image.png" alt="houses" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
