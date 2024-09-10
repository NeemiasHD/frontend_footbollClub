"use client";
import React, { useEffect, useState } from "react";
import Cardplayer from "../cardPlayer/Cardplayer";
import InputImagem from "../inputimage/InputImagem";
import NewsComponent from "./NewsComponent";
import AdmCriarNoticia from "./AdmCriarNoticia";
import {
  HandleFetchDelete,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { BiSave, BiTrash } from "react-icons/bi";
import { GridLoader } from "react-spinners";
type Noticia = {
  mensagem: string;
  imagem: string;
  noticiaId: number;
  // Adicione outros campos aqui conforme necessário
};
type Jogador = {
  jogadorId: number;
  nome: string;
  foto: string;
  posicao: string;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  gols: number;
  assistencias: number;
  bagreDaPartida: number;
  numCamisa: number;
};
function NoticiaSecao() {
  const [ultimobagreouro, setultimobagreouro] = useState(0);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const {
    atualizarNoticias,
    jogadores,
    setAtualizarNoticias,
    bagreouroatual,
    setBagreOuroAtual,
    usuarioSecao,
  } = UseBagresContext();
  const [JogadorSelecionado, SetJogadorSelecionado] = useState<Jogador | null>(
    null
  );

  useEffect(() => {
    //buscar noticias
    const fetchNoticias = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BAGRES}noticia`
        );
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchNoticias();
  }, [atualizarNoticias]);

  useEffect(() => {
    //encontrar os dados do bagre de ouro atual

    const teste = jogadores.find((j) => j.jogadorId === bagreouroatual);
    if (teste) SetJogadorSelecionado(teste);

    if (ultimobagreouro === 0 && bagreouroatual) {
      //definindo o ultimo bagre de ouro inicial se não tiver antes algum
      setultimobagreouro(bagreouroatual);
    }
  }, [bagreouroatual, jogadores]);

  const HandleNovobagreDeOuro = async () => {
    //setar novo bagre de ouro
    if (ultimobagreouro == bagreouroatual) {
      alert("ja e o bagre atual");
      return;
    }
    setultimobagreouro(bagreouroatual);
    const BagreDeOuroAtual = {
      bagreid: bagreouroatual,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}BagreDeOuroAtual`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
          },
          body: JSON.stringify(BagreDeOuroAtual),
        }
      );

      if (response.ok) {
        // Notícia criada com sucesso
        setAtualizarNoticias(atualizarNoticias + 1);
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar notícia");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="NewsContainer">
      <div
        className="NewsComponents"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="newsSwipe">
          {noticias.length ? (
            <Swiper
              spaceBetween={20}
              modules={[Autoplay]}
              style={{ width: "100%" }}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {noticias.map((noticia) => (
                <SwiperSlide key={noticia.noticiaId} className="swipeee">
                  <div
                    className="noticiaSombra"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "400px",
                      bottom: "0px",
                     

                      zIndex: 20,
                     
                    }}
                  ></div>
                  <p
                    className="NoticiaMensagem"
                    style={{
                      position: "absolute",
                      width: "100%",
                      bottom: "10px",
                      fontWeight: "500",
                      color: "white",

                      zIndex: 20,
                    }}
                  >
                    {noticia.mensagem}
                  </p>
                  <NewsComponent imagem={noticia.imagem} />
                  {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a criar
                    <div 
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0px",
                        cursor: "pointer",
                        color: "white",
                        width: "40px",
                        height: "40px",

                        alignItems: "center",

                        zIndex: 50,
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onClick={() => {
                        HandleFetchDelete(
                          "noticia",
                          noticia.noticiaId,
                          setAtualizarNoticias,
                          atualizarNoticias,
                          usuarioSecao.token
                        );
                      }}
                    >
                      <BiTrash size={30} />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              style={{
                backgroundColor: "var(--cinza)",
                width: "100%",
                height: "100%",
              }}
            ></div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="./img/bagresdeouroglow.png"
              className="glowBagreDeOuro"
              style={{
                position: "absolute",
                pointerEvents: "none",
              }}
            />

            <div className="bagredeourocard">
              {JogadorSelecionado ? (
                <Cardplayer
                  nome={JogadorSelecionado.nome}
                  posicao={JogadorSelecionado.posicao}
                  pac={JogadorSelecionado.pac}
                  sho={JogadorSelecionado.sho}
                  pas={JogadorSelecionado.pas}
                  dri={JogadorSelecionado.dri}
                  def={JogadorSelecionado.def}
                  phy={JogadorSelecionado.phy}
                  foto={JogadorSelecionado.foto}
                  numCamisa={JogadorSelecionado.numCamisa}
                  gols={JogadorSelecionado.gols}
                  assistencias={JogadorSelecionado.assistencias}
                  bagreDaPartida={JogadorSelecionado.bagreDaPartida}
                  isBagredeOuro={1}
                  jogadorId={JogadorSelecionado.jogadorId}
                  cardBanner="./img/carddourado.png"
                />
              ) : (
                <GridLoader color="#ff9d00" />
              )}
            </div>
          </div>
          {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a criar
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "50px",
              }}
            >
              <select
                className="input"
                style={{
                  height: "40px",
                  padding: "10px",
                  width: "200px",
                  zIndex: 200,
                  backgroundColor: "transparent",
                  border: "2px dotted var(--cinza)",
                }}
                onChange={(e) => {
                  const idBagreDeOuro = e.target.value;
                  if (idBagreDeOuro) setBagreOuroAtual(parseInt(idBagreDeOuro));
                }}
              >
                <option value="">Selecionar Jogador</option>
                {jogadores.map((jogador) => (
                  <option key={jogador.jogadorId} value={jogador.jogadorId}>
                    {jogador.nome}
                  </option>
                ))}
              </select>
              <div style={{ cursor: "pointer" }}>
                <BiSave onClick={HandleNovobagreDeOuro} />
              </div>
            </div>
          )}
        </div>
        {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a Criar
          <AdmCriarNoticia />
        )}
      </div>
    </div>
  );
}

export default NoticiaSecao;
