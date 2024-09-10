"use client";
import React, { useEffect, useState } from "react";
import HeaderSection from "../headerSection/HeaderSection";
import Cardplayer from "../cardPlayer/Cardplayer";
import AdmCriarCardPlayer from "../cardPlayer/AdmCriarCardPlayer";
import { BiSearch } from "react-icons/bi";
import { UseBagresContext } from "@/app/Context/BagresContext";

function JogadoresSecao() {
  const { jogadores, usuarioSecao } = UseBagresContext();

  return (
    <div
      className="JogadoresSecaoMain"
      style={{ paddingTop: "100px", backgroundColor: "white" }}
    >
      <HeaderSection NomeSecao="Jogadores" />
      <div className="navbarJogadores" style={{ display: "flex" }}>
        <input
          className="barraPesquisa"
          type="text"
          placeholder="Pesquise o nome do jogador"
        />
        <p className="BotaoPesquisarJogador">
          <BiSearch />
        </p>
      </div>
      <div className="ListarJogadores">
        {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a Criar
          <AdmCriarCardPlayer />
        )}
        {jogadores.map((jogador) => (
          <Cardplayer
            key={jogador.jogadorId}
            cardBanner="./img/cardcinza.png"
            nome={jogador.nome}
            posicao={jogador.posicao}
            pac={jogador.pac}
            sho={jogador.sho}
            pas={jogador.pas}
            dri={jogador.dri}
            def={jogador.def}
            phy={jogador.phy}
            foto={jogador.foto}
            jogadorId={jogador.jogadorId}
            numCamisa={jogador.numCamisa}
            assistencias={jogador.assistencias}
            gols={jogador.gols}
            bagreDaPartida={jogador.bagreDaPartida}
          />
        ))}
      </div>
    </div>
  );
}

export default JogadoresSecao;
