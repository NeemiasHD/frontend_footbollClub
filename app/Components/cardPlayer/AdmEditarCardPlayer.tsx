"use client";
import React, { useState } from "react";
import InputImagemJogador from "./InputImagemJogador";
import AtributoPlayer from "./AtributoPlayer";
import {
  HandleFetchDelete,
  jogador,
  UploadImagemToClound,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";

interface CardProp {
  jogador: jogador;
  setAlterarPlayerIsOn: (value: boolean) => void; // Correção aqui
}
const AdmEditarCardPlayer: React.FC<CardProp> = ({
  jogador,
  setAlterarPlayerIsOn,
}) => {
  const [pac, setpac] = useState(jogador.pac);
  const [sho, setsho] = useState(jogador.sho);
  const [pas, setpas] = useState(jogador.pas);
  const [dri, setdri] = useState(jogador.dri);
  const [def, setdef] = useState(jogador.def);
  const [phy, setphy] = useState(jogador.phy);
  const [nome, setNome] = useState(jogador.nome);
  const [gols, setGols] = useState(jogador.gols);
  const [assistencias, setAssistencias] = useState(jogador.assistencias);

  const [NumeroCamisa, setNumeroCamisa] = useState(jogador.numCamisa);

  const [posicao, setposicao] = useState<string | null>(jogador.posicao);
  const { Atualizarjogadores, SetAtualizarJogadores, usuarioSecao } =
    UseBagresContext();
  const [IsLoading, setIsLoading] = useState(false);

  const handleEditCard = async () => {
    setIsLoading(!IsLoading);
    //let r;
    //if (ImagemUpload) r = await UploadImagemToClound(ImagemUpload);

    const jogadorEdit = {
      jogadorId: jogador.jogadorId,
      nome: nome,
      posicao: posicao,
      pac: pac,
      sho: sho,
      pas: pas,
      dri: dri,
      def: def,
      phy: phy,
      foto: jogador.foto,
      gols: gols,
      assistencias: assistencias,
      bagreDaPartida: jogador.bagreDaPartida,
      numCamisa: NumeroCamisa,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}jogador/${jogador.jogadorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
          },
          body: JSON.stringify(jogadorEdit),
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
                <option value={jogador.posicao}>{jogador.posicao}</option>
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
                defaultValue={jogador.numCamisa}
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
              <img src={jogador.foto} style={{ height: "100%" }} />
            </div>
          </div>
          <input
            type="text"
            className="input"
            placeholder="Nome Jogador"
            style={{ textAlign: "center", height: "30px", width: "250px" }}
            onChange={(e) => setNome(e.target.value)}
            defaultValue={jogador.nome}
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
              defaultvalue={jogador.pac}
            />
            <AtributoPlayer
              AtributeName="SHO"
              SetAtributeNumber={setsho}
              defaultvalue={jogador.sho}
            />
            <AtributoPlayer
              AtributeName="PAS"
              SetAtributeNumber={setpas}
              defaultvalue={jogador.pas}
            />
            <AtributoPlayer
              AtributeName="DRI"
              SetAtributeNumber={setdri}
              defaultvalue={jogador.dri}
            />
            <AtributoPlayer
              AtributeName="DEF"
              SetAtributeNumber={setdef}
              defaultvalue={jogador.def}
            />
            <AtributoPlayer
              AtributeName="PHY"
              SetAtributeNumber={setphy}
              defaultvalue={jogador.phy}
            />
            <AtributoPlayer
              AtributeName="Gols"
              SetAtributeNumber={setGols}
              defaultvalue={jogador.gols}
            />
            <AtributoPlayer
              AtributeName="Assists"
              SetAtributeNumber={setAssistencias}
              defaultvalue={jogador.assistencias}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              position: "absolute",
              bottom: "-40px",
              zIndex: "20",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "var(--corazul)",
                padding: "5px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "white",
                width: "100%",
                textAlign: "center",
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
                width: "100%",
                textAlign: "center",
              }}
              onClick={() => {
                setIsLoading(!IsLoading);
                usuarioSecao?.token &&
                  HandleFetchDelete(
                    "jogador",
                    jogador.jogadorId,
                    SetAtualizarJogadores,
                    Atualizarjogadores,
                    usuarioSecao?.token
                  );
                setIsLoading(!IsLoading);
              }}
            >
              Excluir
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdmEditarCardPlayer;
