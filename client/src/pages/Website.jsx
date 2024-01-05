import React from 'react';
import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import GetStarted from "../components/GetStarted/GetStarted";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";

const Website = () => {
  return (
    <div className="App">
      {/* Отображение компонента Hero */}
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>
      
      {/* Отображение компонента Companies */}
      <Companies />

      {/* Отображение компонента Residencies */}
      <Residencies />

      {/* Отображение компонента Value */}
      <Value />

      {/* Отображение компонента Contact */}
      <Contact />

      {/* Отображение компонента GetStarted */}
      <GetStarted />
      
      {/* Отображение компонента Footer */}
      <Footer />
    </div>
  );
}

export default Website;
