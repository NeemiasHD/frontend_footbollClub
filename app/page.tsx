import React from "react";

import Cardplayer from "./Components/cardPlayer/Cardplayer";
import Calendario from "./Components/calendario/CalendarioSecao";
import News from "./Components/noticias/NoticiaSecao";
import Header from "./Components/header/Header";
import Welcomebanner from "./Components/Welcomebanner";
import ResultadosSection from "./Components/resultados/ResultadosSection";
import JogadoresSecao from "./Components/jogadoresSecao/JogadoresSecao";
import FotosSection from "./Components/fotosSection/FotosSection";
import LojaSection from "./Components/lojaBagres/LojaSection";

function page() {
  return (
    <div className="Main">
      <Welcomebanner />
      <News />
      <Calendario />
      <ResultadosSection />
      <LojaSection />
      <JogadoresSecao />
      <FotosSection />
    </div>
  );
}

export default page;
