"use client";
import React, { useEffect, useState } from "react";
import Partida from "./Partida";
import HeaderSection from "../headerSection/HeaderSection";
import AdmCriarTime from "./AdmCriarTime";
import { UseBagresContext } from "@/app/Context/BagresContext";
import AdmCriarPartidas from "./AdmCriarPartidas";
import BannerPartida from "../bannerPartida/BannerFimPartida";
import { BiCloset } from "react-icons/bi";

function CalendarioSecao() {
  const { Partidas, usuarioSecao } = UseBagresContext();
  const [TemPartidaAgendada, setTemPartidaAgendada] = useState(false)
  useEffect((
  ) => {
    var PA = Partidas.some((p) => p.partidaFinalizada === false);
    setTemPartidaAgendada(PA)
  }, [Partidas])


  return (
    <div className="MainCalendario pb-[70px]">
      <div className="ConfrontoContainer">
        {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a criar
          <>
            <AdmCriarTime />
            <AdmCriarPartidas />
          </>
        )}
        {!TemPartidaAgendada && <p className="h-[360px] w-[300px] flex justify-center items-center">Não há partidas agendadas</p>
        }
        {Partidas.map((p) =>
          p.partidaFinalizada === false ? (
            <Partida key={p.partidaId} partida={p} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default CalendarioSecao;
