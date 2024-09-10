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
            <Partida
              key={p.partidaId}
              tipoConfronto={p.tipo}
              local={p.local}
              data={p.data}
              horario={p.horario}
              time1Logo={p.time1.escudo}
              time1Nome={p.time1.nome}
              time2Logo={p.time2.escudo}
              time2Nome={p.time2.nome}
              id={p.partidaId}
              //alterar dados dos times
              T1_id={p.time1.timeId}
              T1_vitorias={p.time1.vitorias}
              T1_derrotas={p.time1.derrotas}
              T1_empates={p.time1.empates}
              T1_golsFeitos={p.time1.golsFeitos}
              T1_golsSofridos={p.time1.golsSofridos}
              T2_id={p.time2.timeId}
              T2_vitorias={p.time2.vitorias}
              T2_derrotas={p.time2.derrotas}
              T2_empates={p.time2.empates}
              T2_golsFeitos={p.time2.golsFeitos}
              T2_golsSofridos={p.time2.golsSofridos}
            />
          ) : null
        )}
      </div>
    </div>
  );
}

export default CalendarioSecao;
