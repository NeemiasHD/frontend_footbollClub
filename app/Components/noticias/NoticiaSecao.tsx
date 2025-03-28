"use client";
import React, { useEffect, useState } from "react";
import Cardplayer from "../cardPlayer/Cardplayer";
import InputImagem from "../inputimage/InputImagem";
import NewsComponent from "./NewsComponent";
import AdmCriarNoticia from "./AdmCriarNoticia";
import {
  HandleFetchDelete,
  jogador,
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
interface Props {
  tipo?: boolean; //verifica se é renderizar a sessão de 2 formas
}
const NoticiaSecao: React.FC<Props> = ({ tipo }) => {

  const [ultimobagreouro, setultimobagreouro] = useState(0);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const {
    atualizarNoticias,
    jogadores,
    setAtualizarNoticias,
    bagreouroatual,
    setBagreOuroAtual,
    usuarioSecao, popupNoticia
  } = UseBagresContext();
  const [JogadorSelecionado, SetJogadorSelecionado] = useState<jogador | null>(
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

  return (<>
    <div className={`NewsContainer ${tipo ? "mt-10" : "bg-white"}`}>
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
                      marginLeft: "10px",

                      zIndex: 20,
                    }}
                  >
                    {noticia.mensagem}
                  </p>
                  <NewsComponent imagem={noticia.imagem} />
                  {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a criar
                    <div
                      className=" bg-black/70 text-white p-2 rounded-full"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
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
                <Cardplayer jogador={JogadorSelecionado} isBagredeOuro={1} />
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
                className={`Input outline-none ${popupNoticia && 'text-gray-400 '}`}
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
                <option value=""  >Selecionar Jogador</option>
                {jogadores.map((jogador) => (
                  <option key={jogador.jogadorId} value={jogador.jogadorId}>
                    {jogador.nome}
                  </option>
                ))}
              </select>
              <div
                className={`${popupNoticia && 'text-white  '}`}
                style={{ cursor: "pointer" }}>
                <BiSave onClick={HandleNovobagreDeOuro} />
              </div>
            </div>
          )}
        </div>
        {usuarioSecao?.user?.role == "admin" && !tipo && ( //Apenas ADM tem Acesso a Criar
          <AdmCriarNoticia />
        )}
      </div>
    </div>
    <div className={`subNoticias pt-4 gap-4 flex-wrap ${tipo ? "" : "bg-white"}  justify-center items-center`}>
      {noticias.slice(0, 3).map((noticia) => (


        <div className=' w-[339px]'>

          <div className=' overflow-hidden'>
            <img className='w-full hover:brightness-75 transition-all' src={noticia.imagem} />
          </div>
          <p className={`text-[12px] h-[70px] ${tipo ? "text-white" : "text-black"}`}>{noticia.mensagem}</p>
        </div>
      ))}

    </div>
  </>
  );
}

export default NoticiaSecao;
