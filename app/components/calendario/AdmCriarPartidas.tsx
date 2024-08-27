"use client";
import React, { useState } from "react";
import InputLogoCriarTime from "./inputLogoCriarTime";
import { UseBagresContext } from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";

function AdmCriarPartidas() {
  const { Times, AtualizarPartidas, SetAtualizarPartidas } = UseBagresContext();
  const [IsLoading, SetIsLoading] = useState(false);

  const [tipo, setTipo] = useState<string | null>(null); //tipo de confronto

  const [data, setData] = useState<string | null>(null);
  const [local, setLocal] = useState<string | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const [time1_id, setTime1_id] = useState<number | null>(null);
  const [time2_id, setTime2_id] = useState<number | null>(null);

  const HandleCriarPartida = async () => {
    SetIsLoading(true);

    const partida = {
      tipo: tipo,
      local: local,
      horario: horario,
      partidaFinalizada: false,
      data: data,
      time1_id: time1_id,
      time2_id: time2_id,
    };
    console.log(partida);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}partida`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(partida),
        }
      );

      if (response.ok) {
        // Notícia criada com sucesso
        console.log(response);
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar notícia");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    SetAtualizarPartidas(AtualizarPartidas + 1);
    SetIsLoading(false);
  };

  return (
    <div className="Confronto">
      {IsLoading ? (
        <GridLoader color="#00d2ff" />
      ) : (
        <>
          <select
            className="Combobox tipoConfronto"
            onChange={(e) => {
              setTipo(e.target.value);
            }}
            id="combobox"
          >
            <option value="">Tipo de Confronto</option>
            <option value="Amistoso">Amistoso</option>
            <option value="Fase de Grupo">Fase de Grupo</option>
            <option value="Mata-Mata - IDA">Mata-Mata - IDA</option>
            <option value="Mata-Mata - VOLTA">Mata-Mata - VOLTA</option>
            <option value="Final">Final</option>
          </select>
          <div className="LogoDosTime">
            <select
              className="Combobox EscolherTime"
              onChange={(e) => {
                setTime1_id(Number(e.target.value));
              }}
              id="comboboxEscolherTime1"
            >
              <option>Time 1</option>

              {Times.map((time) => (
                <option key={time.timeId} value={time.timeId}>
                  {time.nome}
                </option>
              ))}
            </select>
            <p>X</p>
            <select
              className="Combobox EscolherTime"
              onChange={(e) => {
                setTime2_id(Number(e.target.value));
              }}
              id="comboboxEscolherTime2"
            >
              <option>Time 2</option>

              {Times.map((time) => (
                <option key={time.timeId} value={time.timeId}>
                  {time.nome}
                </option>
              ))}
            </select>
          </div>
          <input
            type="date"
            onChange={(e) => {
              setData(e.target.value);
            }}
            className="Combobox DataConfronto"
          />
          <input
            type="Time"
            onChange={(e) => {
              setHorario(e.target.value);
            }}
            className="Combobox tempoConfronto"
          />
          <input
            type="text"
            onChange={(e) => {
              setLocal(e.target.value);
            }}
            className="Combobox LocalConfronto"
            placeholder="Local Confronto"
          />
          <div className="BotoesCriarTime">
            <p
              className="CriarTime"
              style={{ cursor: "pointer" }}
              onClick={HandleCriarPartida}
            >
              Salvar
            </p>
            <p className="LimparTime">Limpar</p>
          </div>
        </>
      )}
    </div>
  );
}

export default AdmCriarPartidas;
