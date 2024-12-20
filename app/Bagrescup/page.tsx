'use client';
import React, { useState } from 'react';
import { jogador, UseBagresContext } from '../Context/BagresContext';
import Welcomebanner from '../Components/Welcomebanner';
import InputProdutoImg from '../Components/lojaBagres/InputProdutoImg';

function Page() {
  const { jogadores } = UseBagresContext();

  // Função para embaralhar a lista de jogadores e criar times de 4 jogadores
  const criarTimes = (): jogador[][] => {
    const jogadoresAleatorios = [...jogadores].sort(() => Math.random() - 0.5);
    const times: jogador[][] = [];

    for (let i = 0; i < jogadoresAleatorios.length; i += 4) {
      const time = jogadoresAleatorios.slice(i, i + 4);
      times.push(time);
    }

    return times;
  };

  const [times, setTimes] = useState<jogador[][]>([]); // Define o tipo do estado

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src='./img/BannerBagresCup.png'
        className='max-w-maxWidthBanner w-full'
        alt='Banner Bagres Cup'
      />
      <div className='flex w-full flex justify-center items-center'>
        <div
          id='Controle'
          className='justify-center items-center gap-3 flex flex-col'
        >
          <div style={{ zoom: '0.76' }}>
            <InputProdutoImg />
          </div>
          <input
            type='date'
            onChange={(e) => {}}
            className='Combobox DataConfronto'
          />
          <input
            type='text'
            placeholder='Nome Competição'
            className='text-center'
          />
          <p
            className=' cursor-pointer bg-corazul text-white p-3 rounded-xl text-center w-full'
            onClick={() => setTimes(criarTimes())}
          >
            Gerar Time
          </p>
          <p
            className=' cursor-pointer bg-corazul text-white p-3 rounded-xl text-center w-full'
            onClick={() => setTimes(criarTimes())}
          >
            Criar Competição
          </p>
        </div>

        <div className='flex gap-2 flex-wrap justify-center items-center max-w-4xl'>
          {times.map((time, index) => (
            <div
              key={index}
              className='w-48 border h-48 flex items-center flex-col justify-center text-center'
            >
              <input
                type='text'
                placeholder='Nome Time'
                className='text-center w-full'
              />
              <input type='color' />
              <ul className='h-full flex flex-col justify-center items-center'>
                {time.map((jogador, jIndex) => (
                  <li key={jIndex}>{jogador.nome}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div>Times</div>
    </div>
  );
}

export default Page;
