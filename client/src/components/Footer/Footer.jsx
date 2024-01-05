import "./Footer.css";

const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* Левая часть футера */}
        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="" width={120} />
          <span className="secondaryText">
            Наше видение – сделать всех людей <br />
            лучшее место для жизни для них.
          </span>
        </div>

        {/* Правая часть футера */}
        <div className="flexColStart f-right">
          <span className="primaryText">Информация</span>
          <span className="secondaryText">Uzbekistan</span>
          <div className="flexCenter f-menu">
            <span>Свойство</span>
            <span>Услуги</span>
            <span>Продукт</span>
            <span>О нас</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;