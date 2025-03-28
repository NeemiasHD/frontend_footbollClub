"use client"
import React, { useEffect } from 'react';

import Cardplayer from './Components/cardPlayer/Cardplayer';
import Calendario from './Components/calendario/CalendarioSecao';
import News from './Components/noticias/NoticiaSecao';
import Header from './Components/header/Header';
import Welcomebanner from './Components/Welcomebanner';
import ResultadosSection from './Components/resultados/ResultadosSection';
import JogadoresSecao from './Components/jogadoresSecao/JogadoresSecao';
import FotosSection from './Components/fotosSection/FotosSection';
import LojaSection from './Components/lojaBagres/LojaSection';
import BackToTopBtn from './Components/backToTopBtn/BackToTopBtn';
import HeaderSection from './Components/headerSection/HeaderSection';
import { UseBagresContext } from './Context/BagresContext';

function page() {
  const { jogadores } = UseBagresContext();

  return (
    <div className='Main'>

      <Welcomebanner imgBanner='./img/imgbanner.png' />
      {jogadores.length > 0 ?
        <>
          <News />
         
          <div className='bg-[#F5F5F5]'>

            <HeaderSection NomeSecao={"Calendario"} URL="Calendario" />
          </div>

          <Calendario />

          <LojaSection />

          <HeaderSection NomeSecao={'Resultados'} URL='Resultados' />
          <ResultadosSection />

          <HeaderSection NomeSecao={"Jogadores"} URL='Jogadores' />
          <JogadoresSecao />

          <HeaderSection NomeSecao={"Fotos"} URL='Fotos' />

          <FotosSection />
        </> :
        <div className='h-[100vh] w-full bg-white'></div>
      }

    </div>
  );
}

export default page;
