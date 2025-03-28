'use client';
import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import { BiDownload, BiEdit } from 'react-icons/bi';
import AdmEditarCardPlayer from './AdmEditarCardPlayer';
import {
  jogador,
  RenderImagemParaCanvas,
  UseBagresContext,
} from '@/app/Context/BagresContext';
import { PiArrowUpFill } from 'react-icons/pi';
import { BsArrowDown, BsArrowUp } from 'react-icons/bs';
import ReactCardFlip from 'react-card-flip';

interface CardProp {
  isBagredeOuro?: number;
  jogador: jogador;
}

const Cardplayer: React.FC<CardProp> = ({ isBagredeOuro, jogador }) => {
  const [alterarPlayerIsOn, setAlterarPlayerIsOn] = useState(false); //controla a alteracao do jogador
  const { usuarioSecao, popupNoticia } = UseBagresContext();
  const [Foto, SetFOTO] = useState<string>('');
  const [numeroCamisaAtivo, setNumeroCamisaAtivo] = useState(false);

  const handleSaveCard = () => {
    if (jogador?.jogadorId) {
      const bannerElement = document.getElementById(
        `Card${jogador?.jogadorId}`
      );
      if (bannerElement)
        html2canvas(bannerElement, { backgroundColor: null }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = `Card_do_${jogador.nome}.png`;
          link.click();
        });
    }
  };
  useEffect(() => {
    const fetchImage = async () => {
      const FOTO = await RenderImagemParaCanvas(jogador?.foto);
      if (FOTO) {
        SetFOTO(FOTO);
      }
    };
    fetchImage();
  }, [jogador?.foto]);

  if (!jogador || !jogador.jogadorId) {
    return null; // ou algum componente de loading
  }
  const handleGirarCarta = () => {
    setNumeroCamisaAtivo(!numeroCamisaAtivo); // Muda o estado para flipar a carta
  };

  return alterarPlayerIsOn ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <AdmEditarCardPlayer
        jogador={jogador}
        setAlterarPlayerIsOn={setAlterarPlayerIsOn}
      />
    </div>
  ) : (
    <>
      <div
        className='MainCard w-[300px] h-[400px] flex items-center justify-center relative cursor-pointer'
        title={
          jogador.posicao === 'X'
            ? 'Lesionado'
            : `Camisa Nº ${jogador.numCamisa}`
        }
      >
        <ReactCardFlip isFlipped={numeroCamisaAtivo} flipDirection='horizontal'>
          {/* Frente da carta */}
          <div
            id={`Card${jogador.jogadorId}`}
            onClick={() => {
              !isBagredeOuro && setNumeroCamisaAtivo(!numeroCamisaAtivo);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '300px',
              height: '400px',
              position: 'relative',
              transition: 'all 0.3s',
              cursor: 'pointer',
              zoom: 1,
            }}
          >

            <img
              className='cardImg'
              src={
                jogador.posicao === 'X' && !isBagredeOuro
                  ? './img/cardcinzalesao.png'
                  : jogador.posicao === 'X' && isBagredeOuro
                    ? './img/bagredeourolesionado.png'
                    : !isBagredeOuro
                      ? './img/cardcinza.png'
                      : './img/carddourado.png'
              }
            />
            <div className='atributo picContainer'>
              <img className='playerpic' src={Foto} />
            </div>
            <p className='atributo overall '>
              {Math.round(
                (jogador.pac +
                  jogador.sho +
                  jogador.pas +
                  jogador.dri +
                  jogador.def +
                  jogador.phy) /
                6
              )}
              <div
                style={{
                  position: 'absolute',
                  color: 'red',
                  left: '-15px',
                  fontSize: '15px',
                }}
              >
                <BsArrowDown />
              </div>
            </p>
            <p className='atributo posicao'>
              {jogador.posicao === 'X' ? (
                <span
                  style={{
                    color: 'red',
                    textShadow:
                      '0px 0px 20px red,0px 0px 20px red,0px 0px 20px red',
                  }}
                >
                  {jogador.posicao}
                </span>
              ) : (
                jogador.posicao
              )}
            </p>
            <p className='atributo nomeJogador'>{jogador.nome}</p>
            <p className='atributo pac'>{jogador.pac}</p>
            <p className='atributo sho'>{jogador.sho}</p>
            <p className='atributo pas'>{jogador.pas}</p>
            <p className='atributo dri'>{jogador.dri}</p>
            <p className='atributo def'>{jogador.def}</p>
            <p className='atributo phy'>{jogador.phy}</p>
          </div>

          {/* Verso da carta */}
          <div
            style={{
              height: '400px',
              alignContent: 'center',
            }}
          >
            <div
              onClick={handleGirarCarta}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                display: 'flex',
                cursor: 'pointer',
                zIndex: 1000,
                top: '50px',
                height: '325px',
              }}
            >
              <img src='./img/numCamisaBagres.png' height={325} />
              <div
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  top: '80px',
                }}
              >
                <p style={{ fontSize: '20px', fontWeight: '700' }}>
                  {jogador.nome.toLocaleUpperCase()}
                </p>
                <p
                  style={{
                    fontSize: '100px',
                    fontWeight: '600',
                    display: 'flex',
                    height: '90px',
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {jogador.numCamisa}
                </p>
              </div>
            </div>
          </div>
        </ReactCardFlip>
        {usuarioSecao?.user?.role === 'admin' && (
          <div
            className={`${popupNoticia && 'text-white'}`}
            style={{
              position: 'absolute',
              bottom: '-20px',
              fontSize: '20px',
            }}
            onClick={() => setAlterarPlayerIsOn(!alterarPlayerIsOn)}
          >
            <BiEdit />
          </div>
        )}
        {/* <div
          className={`${popupNoticia && 'text-white'}`}
          style={{
            position: 'absolute',
            bottom: '-25px',
            fontSize: '20px',
          }}
          onClick={handleSaveCard}
        >
          {!numeroCamisaAtivo && <BiDownload />}
        </div> */}
      </div>
    </>
  );
};

export default Cardplayer;
