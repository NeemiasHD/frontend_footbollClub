"use client";
import React, { useEffect, useState } from "react";
import HeaderSection from "../headerSection/HeaderSection";
import Cardplayer from "../cardPlayer/Cardplayer";
import AdmCriarCardPlayer from "../cardPlayer/AdmCriarCardPlayer";
import { BiSearch, BiX } from "react-icons/bi";
import { jogador, UseBagresContext } from "@/app/Context/BagresContext";
interface Props {
  tipo?: boolean; //verifica se é renderizar a sessão de 2 formas
}
const JogadoresSecao: React.FC<Props> = ({ tipo }) => {
  const { jogadores, usuarioSecao, setjogadores, SetAtualizarJogadores, Atualizarjogadores } = UseBagresContext();
  const [JogadoresFiltrados, setJogadoresFiltrados] = useState<jogador[]>([]);

  const [BuscaJogador, setBuscaJogador] = useState("")
  const BuscarJogadorPeloNome = () => {
    setJogadoresFiltrados(jogadores.filter(e => e.nome.toLocaleLowerCase().includes(BuscaJogador.toLocaleLowerCase())))

  }


  const filtro_de_busca = () => {
    if (BuscaJogador == "" || BuscaJogador == " ") {
      setJogadoresFiltrados(jogadores)
    } else {

      BuscarJogadorPeloNome()
    }

  }

  useEffect(() => { setJogadoresFiltrados(jogadores) }, [jogadores])

  return (
    <div
      className="JogadoresSecaoMain"
      style={{ backgroundColor: "white" }}
    >
      <div className=" navbarJogadores w-full items-center justify-center flex" style={{ display: "flex" }}>
        <div className="w-full max-w-[830px] relative justify-center items-center flex ">

          <input
            className="barraPesquisa border-2 w-full max-w-[830px] "
            type="text"
            placeholder="Pesquise o nome do jogador"
            value={BuscaJogador}
            onChange={(e) => setBuscaJogador(e.target.value)}
          />
          <button className=" absolute right-3 text-[20px] text-[#a3a3a3] " onClick={() => {
            setBuscaJogador("")
            setJogadoresFiltrados(jogadores)

          }}>

            <BiX />

          </button>
        </div>
        <p className="BotaoPesquisarJogador h-[50px]" onClick={filtro_de_busca}>
          <BiSearch />
        </p>

      </div>
      <div className="ListarJogadores mb-[50px]">
        {usuarioSecao?.user?.role == "admin" && ( //Apenas ADM tem Acesso a Criar
          <AdmCriarCardPlayer />
        )}
        {!tipo ? JogadoresFiltrados
          .slice(0, 6)                    // Seleciona os primeiros 6
          .map((jogador) => (
            <Cardplayer key={jogador.jogadorId} jogador={jogador} />
          )) : JogadoresFiltrados
            .map((jogador) => (
              <Cardplayer key={jogador.jogadorId} jogador={jogador} />
            ))}

      </div>
    </div>
  );
}

export default JogadoresSecao;
