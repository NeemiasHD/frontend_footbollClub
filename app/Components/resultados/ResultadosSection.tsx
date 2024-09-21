"use client";
import React from "react";
import HeaderSection from "../headerSection/HeaderSection";
import { BarChart, PieChart } from "@mui/x-charts";
import { UseBagresContext } from "@/app/Context/BagresContext";
import PartidaFinalizada from "./PartidaFinalizada";
function ResultadosSection() {
  const { Partidas, Times, jogadores } = UseBagresContext();
  const formatData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="ResultadosSectionMain" style={{ backgroundColor: "white" }}>
      <HeaderSection NomeSecao={"Resultados"} />
      <div className="ContainerPartidasEstatisticas">
        <div className="PartidasFinalizadas">
          {Partidas.map((p) =>
            p.partidaFinalizada === true ? (
              <PartidaFinalizada
                key={p.partidaId}
                id={p.partidaId}
                tipoConfronto={p.tipo}
                data={formatData(p.data)}
                nomeT1={p.time1.nome}
                nomeT2={p.time2.nome}
                logoT1={p.time1.escudo}
                logoT2={p.time2.escudo}
                PlacarT1={p.time1Placar}
                PlacarT2={p.time2Placar}
                //dados para voltar a partida para não finalizada:

                T1_empates={p.time1.empates}
                T2_empates={p.time2.empates}
                T1_vitorias={p.time1.vitorias}
                T2_vitorias={p.time2.vitorias}
                T1_derrotas={p.time1.derrotas}
                T2_derrotas={p.time2.derrotas}
                T1_golsFeitos={p.time1.golsFeitos}
                T2_golsFeitos={p.time2.golsFeitos}
                T1_golsSofridos={p.time1.golsSofridos}
                T2_golsSofridos={p.time2.golsSofridos}
                T1_id={p.time1.timeId}
                T2_id={p.time2.timeId}
              />
            ) : null
          )}
        </div>
        <div className="Estatisticas">
          {Times[1] && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 1,
                        value: Times[0].vitorias,
                        label: "Vitórias",
                        color: "#62ff00",
                      },
                      {
                        id: 2,
                        value: Times[0].derrotas,
                        label: "Derrotas",
                        color: "red",
                      },
                      {
                        id: 0,
                        value: Times[0].empates,
                        label: "Empates",
                        color: "#c2c2c2",
                      },
                    ],
                  },
                ]}
                width={450}
                height={300}
                className="grafico"
              />
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Gols feitos / Gols sofrido / Partidas Jogadas"],
                  },
                ]}
                series={[
                  {
                    data: [Times[0].golsFeitos],
                    color: "var(--corazul)",
                  },
                  {
                    data: [Times[0].golsSofridos],
                    color: "red",
                  },
                  {
                    data: [
                      Times[0].derrotas + Times[0].empates + Times[0].vitorias,
                    ],
                    color: "#c2c2c2",
                  },
                ]}
                width={450}
                height={300}
                className="grafico"
              />
            </div>
          )}
        </div>
      </div>
      <div
        className="Statusjogadores"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            maxWidth: "250px",
            width: "100%",
            gap: "1px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Artilharia</p>
          {jogadores
            .sort((a, b) => b.gols - a.gols) // Ordena em ordem decrescente de gols
            .map((jogador) => (
              <div
                key={jogador.nome}
                style={{
                  width: "100%",
                  border: "1px solid black",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <img src={jogador.foto} style={{ height: "30px" }} />
                <p>{jogador.nome}</p>
                <p>Gols: {jogador.gols}</p>
              </div>
            ))}
        </div>
        <div
          style={{
            maxWidth: "250px",
            width: "100%",
            gap: "1px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p>Assist</p>
          {jogadores
            .sort((a, b) => b.assistencias - a.assistencias) // Ordena em ordem decrescente de gols
            .map((jogador) => (
              <div
                key={jogador.nome}
                style={{
                  width: "100%",
                  border: "1px solid black",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <img src={jogador.foto} style={{ height: "30px" }} />
                <p>{jogador.nome}</p>
                <p>Assist: {jogador.assistencias}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ResultadosSection;
