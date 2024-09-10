"use client";
import React, { useState } from "react";
import InputImagemJogador from "./InputImagemJogador";
import AtributoPlayer from "./AtributoPlayer";
import {
  UploadImagemToClound,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";

function AdmCriarCardPlayer() {
  const [pac, setpac] = useState(null);
  const [sho, setsho] = useState(null);
  const [pas, setpas] = useState(null);
  const [dri, setdri] = useState(null);
  const [def, setdef] = useState(null);
  const [phy, setphy] = useState(null);
  const [nome, setNome] = useState<string | null>(null);
  const [NumeroCamisa, setNumeroCamisa] = useState<string | null>(null);
  const [IsLoading, setIsLoading] = useState(false);

  const [posicao, setposicao] = useState<string | null>(null);
  const {
    ImagemUpload,
    Atualizarjogadores,
    SetAtualizarJogadores,
    usuarioSecao,
  } = UseBagresContext();

  const handleCreateCard = async () => {
    setIsLoading(true);
    let r;
    if (ImagemUpload) r = await UploadImagemToClound(ImagemUpload);

    const jogador = {
      nome: nome,
      posicao: posicao,
      pac: pac,
      sho: sho,
      pas: pas,
      dri: dri,
      def: def,
      phy: phy,
      numCamisa: NumeroCamisa,
      foto: r,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}jogador`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
          },
          body: JSON.stringify(jogador),
        }
      );

      if (!response.ok) {
        alert("Erro ao criar card");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    setIsLoading(false);

    SetAtualizarJogadores(Atualizarjogadores + 1);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "300px",
        height: "380px",
        border: " 2px solid var(--cinza)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        gap: `10px`,
      }}
    >
      {IsLoading ? (
        <GridLoader color="#00d2ff" size={50} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "250px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <select
                className="filtroporposicao"
                style={{
                  width: "100px",
                  border: "2px solid var(--cinza)",
                  backgroundColor: "white",
                }}
                onChange={(e) => setposicao(e.target.value)}
              >
                <option value="">Posição</option>
                <option value="X">LESÃO</option>
                <option value="PIV">PIV</option>
                <option value="ALA">ALA</option>
                <option value="FIX">FIX</option>
                <option value="GOL">GOL</option>
              </select>
              <input
                type="text"
                className="filtroporposicao"
                id="NumeroJogador"
                maxLength={2}
                style={{
                  width: "100px",
                  textAlign: "center",
                  fontSize: "17px",
                  border: "2px solid var(--cinza)",
                }}
                onChange={(e) => setNumeroCamisa(e.target.value)}
                placeholder="Nº"
              />
            </div>

            <InputImagemJogador id="CriarJogador" />
          </div>
          <input
            type="text"
            className="input"
            placeholder="Nome Jogador"
            style={{ textAlign: "center", height: "30px", width: "250px" }}
            onChange={(e) => setNome(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              maxWidth: `250px`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AtributoPlayer AtributeName="PAC" SetAtributeNumber={setpac} />
            <AtributoPlayer AtributeName="SHO" SetAtributeNumber={setsho} />
            <AtributoPlayer AtributeName="PAS" SetAtributeNumber={setpas} />
            <AtributoPlayer AtributeName="DRI" SetAtributeNumber={setdri} />
            <AtributoPlayer AtributeName="DEF" SetAtributeNumber={setdef} />
            <AtributoPlayer AtributeName="PHY" SetAtributeNumber={setphy} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                backgroundColor: "var(--corazul)",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white",
                width: "250px",
                textAlign: "center",
              }}
              onClick={handleCreateCard}
            >
              Salvar
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdmCriarCardPlayer;
