"use client";
import React, { useState } from "react";
import InputImagemJogador from "./InputImagemJogador";
import AtributoPlayer from "./AtributoPlayer";
import {
  HandleFetchDelete,
  UploadImagemToClound,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";

interface CardProp {
  jogadorId: number;
  fotoEDIT?: string;
  posicaoEDIT: string;
  nomeEDIT: string;
  pacEDIT?: number;
  shoEDIT?: number;
  pasEDIT?: number;
  driEDIT?: number;
  defEDIT?: number;
  phyEDIT?: number;
  golsEDIT: number;
  assistenciasEDIT: number;
  bagreDaPartida: number;
  numCamisa: number;
  setAlterarPlayerIsOn: (value: boolean) => void; // Correção aqui
}
const AdmEditarCardPlayer: React.FC<CardProp> = ({
  posicaoEDIT,
  fotoEDIT,
  nomeEDIT,
  pacEDIT,
  shoEDIT,
  pasEDIT,
  driEDIT,
  defEDIT,
  phyEDIT,
  jogadorId,
  golsEDIT,
  assistenciasEDIT,
  bagreDaPartida,
  numCamisa,
  setAlterarPlayerIsOn,
}) => {
  const [pac, setpac] = useState(pacEDIT);
  const [sho, setsho] = useState(shoEDIT);
  const [pas, setpas] = useState(pasEDIT);
  const [dri, setdri] = useState(driEDIT);
  const [def, setdef] = useState(defEDIT);
  const [phy, setphy] = useState(phyEDIT);
  const [nome, setNome] = useState(nomeEDIT);
  const [gols, setGols] = useState(golsEDIT);
  const [assistencias, setAssistencias] = useState(assistenciasEDIT);

  const [NumeroCamisa, setNumeroCamisa] = useState(numCamisa);

  const [posicao, setposicao] = useState<string | null>(posicaoEDIT);
  const { Atualizarjogadores, SetAtualizarJogadores } = UseBagresContext();
  const [IsLoading, setIsLoading] = useState(false);

  const handleEditCard = async () => {
    setIsLoading(!IsLoading);
    //let r;
    //if (ImagemUpload) r = await UploadImagemToClound(ImagemUpload);

    const jogador = {
      jogadorId: jogadorId,
      nome: nome,
      posicao: posicao,
      pac: pac,
      sho: sho,
      pas: pas,
      dri: dri,
      def: def,
      phy: phy,
      foto: fotoEDIT,
      gols: gols,
      assistencias: assistencias,
      bagreDaPartida: bagreDaPartida,
      numCamisa: NumeroCamisa,
    };
    console.log(jogador);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}jogador/${jogadorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jogador),
        }
      );

      if (response.ok) {
        // Notícia criada com sucesso
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar card");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    SetAtualizarJogadores(Atualizarjogadores + 1);
    setAlterarPlayerIsOn(false);
    setIsLoading(!IsLoading);
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
        position: "relative",
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
                <option value={posicaoEDIT}>{posicaoEDIT}</option>
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
                defaultValue={numCamisa}
                onChange={(e) => setNumeroCamisa(parseInt(e.target.value))}
                placeholder="Nº"
              />
            </div>
            <div
              style={{
                height: "150px",
                width: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={fotoEDIT} style={{ height: "100%" }} />
            </div>
          </div>
          <input
            type="text"
            className="input"
            placeholder="Nome Jogador"
            style={{ textAlign: "center", height: "30px", width: "250px" }}
            onChange={(e) => setNome(e.target.value)}
            defaultValue={nomeEDIT}
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
            <AtributoPlayer
              AtributeName="PAC"
              SetAtributeNumber={setpac}
              defaultvalue={pacEDIT}
            />
            <AtributoPlayer
              AtributeName="SHO"
              SetAtributeNumber={setsho}
              defaultvalue={shoEDIT}
            />
            <AtributoPlayer
              AtributeName="PAS"
              SetAtributeNumber={setpas}
              defaultvalue={pasEDIT}
            />
            <AtributoPlayer
              AtributeName="DRI"
              SetAtributeNumber={setdri}
              defaultvalue={driEDIT}
            />
            <AtributoPlayer
              AtributeName="DEF"
              SetAtributeNumber={setdef}
              defaultvalue={defEDIT}
            />
            <AtributoPlayer
              AtributeName="PHY"
              SetAtributeNumber={setphy}
              defaultvalue={phyEDIT}
            />
            <AtributoPlayer
              AtributeName="Gols"
              SetAtributeNumber={setGols}
              defaultvalue={golsEDIT}
            />
            <AtributoPlayer
              AtributeName="Assists"
              SetAtributeNumber={setAssistencias}
              defaultvalue={assistenciasEDIT}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              position: "absolute",
              bottom: "-40px",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--corazul)",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={handleEditCard}
            >
              Editar
            </div>
            <div
              style={{
                backgroundColor: "red",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white",
              }}
              onClick={(e) => {
                setIsLoading(!IsLoading);
                HandleFetchDelete(
                  "jogador",
                  jogadorId,
                  SetAtualizarJogadores,
                  Atualizarjogadores
                );
                setIsLoading(!IsLoading);
              }}
            >
              excluir
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdmEditarCardPlayer;
