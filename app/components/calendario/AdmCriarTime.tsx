"use client";
import React, { useState } from "react";
import InputLogoCriarTime from "./inputLogoCriarTime";
import {
  UploadImagemToClound,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";

function AdmCriarTime() {
  const { ImagemUpload, SetAtualizarTimes, AtualizarTimes } =
    UseBagresContext();
  const [NomeTime, SetNomeTime] = useState("");
  const [IsLoading, SetIsLoading] = useState(false);

  const handleCriarTime = async () => {
    SetIsLoading(true);
    let imagem;
    if (ImagemUpload) imagem = await UploadImagemToClound(ImagemUpload);

    const time = {
      nome: NomeTime,
      escudo: imagem,
      // Adicione outros campos aqui conforme necessário
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(time),
        }
      );

      if (response.ok) {
        // Notícia criada com sucesso
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar notícia");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    SetAtualizarTimes(AtualizarTimes + 1);
    SetIsLoading(false);
  };
  return (
    <div className="Confronto">
      {IsLoading ? (
        <GridLoader color="#00d2ff" />
      ) : (
        <>
          <p style={{ width: `250px`, fontSize: `12px` }}> Criar Time</p>
          <input
            type="text"
            className="Combobox LocalConfronto"
            placeholder="Nome Time"
            onChange={(e) => {
              SetNomeTime(e.target.value);
            }}
          />
          <InputLogoCriarTime id="1" />
          <div className="BotoesCriarTime">
            <p
              className="CriarTime"
              onClick={handleCriarTime}
              style={{ cursor: "pointer" }}
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

export default AdmCriarTime;
