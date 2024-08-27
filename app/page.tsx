import React from "react";

import Cardplayer from "./Components/cardPlayer/Cardplayer";
import Calendario from "./Components/calendario/Calendario";
import News from "./Components/noticias/News";
import Header from "./Components/header/Header";
import Welcomebanner from "./Components/Welcomebanner";
import ResultadosSection from "./Components/resultados/ResultadosSection";
import JogadoresSecao from "./Components/jogadoresSecao/JogadoresSecao";
import FotosSection from "./Components/fotosSection/FotosSection";

function page() {
  return (
    <div className="Main">
      <Welcomebanner />
      <News />
      <Calendario />
      <ResultadosSection />
      <JogadoresSecao />
      <FotosSection />
    </div>
  );
}

export default page;
