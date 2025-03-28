'use client';
import React, { useState } from 'react';
import { jogador, UseBagresContext } from '../Context/BagresContext';
import Welcomebanner from '../Components/Welcomebanner';
import InputProdutoImg from '../Components/lojaBagres/InputProdutoImg';
import FotosSection from '../Components/fotosSection/FotosSection';
import JogadoresSecao from '../Components/jogadoresSecao/JogadoresSecao';

function Page() {
  

  return (

    <JogadoresSecao tipo={true} />

  );
}

export default Page;
