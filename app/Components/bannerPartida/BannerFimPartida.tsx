"use client";
import {
  RenderImagemParaCanvas,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import React, { useEffect, useState } from "react";

interface PartidaProps {
  tipoConfronto: string;
  imagemfimPartida: string;
  data: string;
  nomeT1: string;
  nomeT2: string;
  logoT1: string;
  logoT2: string;
  placarT1: number;
  placarT2: number;
  id: number;
}

type JogadorParticipacao = {
  nomeJogador: string;
  id: number;
  gols: number;
  assistencia: number;
};
const BannerFimPartida: React.FC<PartidaProps> = ({
  placarT1,
  placarT2,
  logoT1,
  logoT2,
  nomeT1,
  nomeT2,
  tipoConfronto,
  data,
  imagemfimPartida,
  id,
}) => {
  const { jogadores } = UseBagresContext();
  const [imgt1, setImgt1] = useState<string>("");
  const [imgt2, setImgt2] = useState<string>("");
  const [JogadoresGols, SetJogadoresGols] = useState<JogadorParticipacao[]>([]);
  const [resetListGols, setResetListGols] =
    useState(false); /*Re-renderizar os inputs de quem fez gol */
  const adicionarOuAtualizarJogador = (
    novoJogador: JogadorParticipacao,
    indexGol: number
  ) => {
    SetJogadoresGols((prevJogadores) => {
      const jogadoresAtualizados = [...prevJogadores];

      // Jogador associado ao índice atual (gol anterior)
      const jogadorAntigo = jogadoresAtualizados[indexGol];

      if (jogadorAntigo) {
        if (jogadorAntigo.gols > 1) {
          // Decrementa os gols do jogador antigo se ele tiver mais de 1 gol
          jogadoresAtualizados[indexGol] = {
            ...jogadoresAtualizados[indexGol],
            gols: jogadoresAtualizados[indexGol].gols - 1,
          };
        } else {
          // Remove o jogador se ele tinha apenas 1 gol
          jogadoresAtualizados.splice(indexGol, 1);
        }
      }

      // Verifica se o novo jogador já está na lista
      const indexJogadorExistente = jogadoresAtualizados.findIndex(
        (jogador) => jogador.nomeJogador === novoJogador.nomeJogador
      );

      if (indexJogadorExistente !== -1) {
        // Se o jogador já existe, incrementa os gols
        jogadoresAtualizados[indexJogadorExistente] = {
          ...jogadoresAtualizados[indexJogadorExistente],
          gols: jogadoresAtualizados[indexJogadorExistente].gols + 1,
        };
      } else {
        // Caso contrário, adiciona o novo jogador
        jogadoresAtualizados.push(novoJogador);
      }

      return jogadoresAtualizados;
    });
  };
  const resetarGolsList = () => {
    setResetListGols(true);
    setTimeout(() => {
      setResetListGols(false);
    }, 1);
  };

  useEffect(() => {
    const fetchImage = async () => {
      const logo = await RenderImagemParaCanvas(logoT1);
      const logo2 = await RenderImagemParaCanvas(logoT2);
      if (logo) {
        setImgt1(logo);
      }
      if (logo2) {
        setImgt2(logo2);
      }
    };
    fetchImage();
  }, [logoT1]);

  return (
    <>
      {placarT1 && !resetListGols && (
        <div
          style={{
            position: "absolute",
            left: -320,
            display: "flex",
            flexDirection: "column",
            transform: "scale(2.5)",
            gap: "10px",
          }}
        >
          {Array.from({ length: placarT1 }).map((_, index) => (
            <>
              <label style={{ color: "white" }}> Gol {index + 1}</label>
              <select
                key={index} // Atribuir uma chave única para cada select
                className="input"
                style={{
                  height: "40px",
                  padding: "10px",
                  zIndex: 200,
                  border: "2px dotted var(--cinza)",
                }}
                onChange={(e) => {
                  const novoJogador: JogadorParticipacao = {
                    nomeJogador: jogadores[Number(e.target.value)].nome,
                    id: 6, // ou algum valor gerado dinamicamente
                    gols: 1,
                    assistencia: 0,
                  };

                  adicionarOuAtualizarJogador(novoJogador, index);
                }}
              >
                <option value="">Selecionar Jogador</option>
                {jogadores.map((jogador, index) => (
                  <option key={jogador.jogadorId} value={index}>
                    {jogador.nome}
                  </option>
                ))}
              </select>
            </>
          ))}
          <p
            onClick={() => {
              SetJogadoresGols([]);
              resetarGolsList();
            }}
            style={{
              backgroundColor: "var(--cinza)",
              cursor: "pointer",
              border: "none",
              textAlign: "center",
              color: "white",
              marginTop: "20px",
            }}
          >
            RESET
          </p>
        </div>
      )}
      <div
        id={`BannerPartidaFinalizada${id}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--corazul)",
          height: "2560px",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={imagemfimPartida}
            style={{
              width: "1700px",
              position: "absolute",
              right: "-100px",
              zIndex: "20",
            }}
          />
          <img
            src="./img/FundoFimPartida.png"
            style={{
              height: "2560px",
              zIndex: "21",
              position: "relative",
              top: "1px",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 21,
            bottom: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "100px",
                color: "white",
                textShadow: "5px 5px 1px var(--cinza)",
              }}
            >
              {placarT1}
            </h1>
            <div
              style={{
                height: "350px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={imgt1} width={350} style={{}} />
            </div>
            <p
              style={{
                fontSize: "60px",
                fontWeight: "800",
                color: "white",
                width: "400px",
                height: "100px",
                textAlign: "center",
                textShadow: "5px 5px 1px var(--cinza)",

                marginTop: "20px",
              }}
            >
              {nomeT1}
            </p>
          </div>
          <p style={{ fontSize: "100px", color: "white" }}>x</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "100px",
                color: "white",
                textShadow: "5px 5px 1px var(--cinza)",
              }}
            >
              {placarT2}
            </h1>
            <div
              style={{
                height: "350px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={imgt2} width={350} />
            </div>

            <p
              style={{
                fontSize: "60px",

                fontWeight: "800",
                color: "white",
                width: "400px",
                textAlign: "center",
                textShadow: "5px 5px 1px var(--cinza)",
                height: "100px",
                marginTop: "20px",
              }}
            >
              {nomeT2}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              top: "-1420px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "30px",
                fontWeight: "600",
              }}
            >
              {tipoConfronto}
            </p>
            <p
              style={{
                color: "white",
              }}
            >
              {data}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              top: "630px",
              right: "600px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              width: "300px",
            }}
          >
            {JogadoresGols.map((jogador) => (
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {jogador.gols}x {jogador.nomeJogador}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerFimPartida;
