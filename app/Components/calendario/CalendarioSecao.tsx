"use client";
import React from "react";
import Partida from "./Partida";
import HeaderSection from "../headerSection/HeaderSection";
import AdmCriarTime from "./AdmCriarTime";
import { UseBagresContext } from "@/app/Context/BagresContext";
import AdmCriarPartidas from "./AdmCriarPartidas";
import BannerPartida from "../bannerPartida/BannerFimPartida";
import { BiCloset } from "react-icons/bi";

function CalendarioSecao() {
  const { Partidas, usuarioSecao } = UseBagresContext();
  return (
    <div className="MainCalendario">
      <HeaderSection NomeSecao={"Calendario"} />
      <div className="ConfrontoContainer">
        {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a criar
          <>
            <AdmCriarTime />
            <AdmCriarPartidas />
          </>
        )}

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
