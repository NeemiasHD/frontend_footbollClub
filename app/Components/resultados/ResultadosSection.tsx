"use client";
import React from "react";
import HeaderSection from "../headerSection/HeaderSection";
import { BarChart } from "@mui/x-charts";
import { UseBagresContext } from "@/app/Context/BagresContext";
import PartidaFinalizada from "./PartidaFinalizada";
function ResultadosSection() {
  const { Partidas, Times } = UseBagresContext();
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
        <div className="Estatisticas" >
          {Times[1] && (
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Vitoria/Derrota", "Gols feitos/sofrido"],
                },
              ]}
              series={[
                {
                  data: [Times[0].vitorias, Times[0].golsFeitos],
                  color: "var(--corazul)",
                },
                {
                  data: [Times[0].derrotas, Times[0].golsSofridos],
                  color: "red",
                },
              ]}
              width={400}
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultadosSection;
