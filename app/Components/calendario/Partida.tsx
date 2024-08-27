"use client";
import React, { useState } from "react";
import { BiCheck, BiTrash } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import InputImagem from "../inputimage/InputImagem";
import { Tooltip } from "@mui/material";
import InputfotoPartida from "./InputfotoPartida";
import html2canvas from "html2canvas";
import BannerFimPartida from "../bannerPartida/BannerFimPartida";
import BannerPrePartida from "../bannerPartida/BannerPrePartida";
import { GridLoader } from "react-spinners";

import {
  HandleFetchDelete,
  UseBagresContext,
} from "@/app/Context/BagresContext";
interface PartidaProps {
  tipoConfronto: string;
  data: string;
  horario: string;
  time1Logo: string;
  time1Nome: string;
  time2Logo: string;
  time2Nome: string;
  local: string;
  id: number;
  //dados a serem mudados no time apos termino de partida
  //Time 1
  T1_id: number;
  T1_vitorias: number;
  T1_derrotas: number;
  T1_empates: number;
  T1_golsFeitos: number;
  T1_golsSofridos: number;
  //Time 2
  T2_id: number;
  T2_vitorias: number;
  T2_derrotas: number;
  T2_empates: number;
  T2_golsFeitos: number;
  T2_golsSofridos: number;
}
const Partida: React.FC<PartidaProps> = ({
  tipoConfronto,
  data,
  horario,
  time1Logo,
  time1Nome,
  time2Logo,
  time2Nome,
  local,
  id,
  T1_id,
  T1_vitorias,
  T1_derrotas,
  T1_empates,
  T1_golsFeitos,
  T1_golsSofridos,
  T2_id,
  T2_vitorias,
  T2_derrotas,
  T2_empates,
  T2_golsFeitos,
  T2_golsSofridos,

  //dados a serem mudados no time
}) => {
  const handleChangestatusTeam1 = async () => {
    //mudar time1
    const updateData = [
      placartime1 === placartime2
        ? {
            path: "/empates",
            op: "replace",
            value: (T1_empates += 1),
          }
        : placartime1 > placartime2
        ? {
            path: "/vitorias",
            op: "replace",
            value: (T1_vitorias += 1),
          }
        : {
            path: "/derrotas",
            op: "replace",
            value: (T1_derrotas += 1),
          },

      {
        path: "/golsFeitos",
        op: "replace",
        value: (T1_golsFeitos += placartime1),
      },
      {
        path: "/golsSofridos",
        op: "replace",
        value: (T1_golsSofridos += placartime2),
      },
    ];
    console.log(updateData);
    //finaliza a partida retirando a mesma do calendario e enviado para o resultados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time/${T1_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Partida atualizada com sucesso
        console.log("time1 atualizada com sucesso");
      } else {
        // Erro ao atualizar partida
        alert("Erro ao atualizar time1");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  const handleChangestatusTeam2 = async () => {
    //mudar time2
    const updateData = [
      placartime1 === placartime2
        ? {
            path: "/empates",
            op: "replace",
            value: (T2_empates += 1),
          }
        : placartime2 > placartime1
        ? {
            path: "/vitorias",
            op: "replace",
            value: (T2_vitorias += 1),
          }
        : {
            path: "/derrotas",
            op: "replace",
            value: (T2_derrotas += 1),
          },

      {
        path: "/golsFeitos",
        op: "replace",
        value: (T2_golsFeitos += placartime2),
      },
      {
        path: "/golsSofridos",
        op: "replace",
        value: (T2_golsSofridos += placartime1),
      },
    ];
    //finaliza a partida retirando a mesma do calendario e enviado para o resultados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time/${T2_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Partida atualizada com sucesso
        console.log("time2 atualizada com sucesso");
      } else {
        // Erro ao atualizar partida
        alert("Erro ao atualizar time2");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleSetFinalizarPartida = async () => {
    //PATCH para mudar o status da partida
    const updateData = [
      {
        path: "/partidaFinalizada",
        op: "replace",
        value: true,
      },
      {
        path: "/time1Placar",
        op: "replace",
        value: placartime1,
      },
      {
        path: "/time2Placar",
        op: "replace",
        value: placartime2,
      },
    ];
    //finaliza a partida retirando a mesma do calendario e enviado para o resultados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}partida/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Partida atualizada com sucesso
        console.log("Partida atualizada com sucesso");
        handleChangestatusTeam1();
        handleChangestatusTeam2();
      } else {
        // Erro ao atualizar partida
        alert("Erro ao atualizar partida");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    SetAtualizarPartidas(AtualizarPartidas + 1);
  };

  const handlefinalizarPartida = () => {
    setBannerFimPartida(!BannerFimdePartida);
  };
  const { AtualizarPartidas, SetAtualizarPartidas, usuarioSecao } =
    UseBagresContext();

  const [placartime1, setPlacartime1] = useState(0);
  const [placartime2, setPlacartime2] = useState(0);
  const [BannerFimdePartida, setBannerFimPartida] = useState(false);
  const [BannerdePrePartidaIsOn, setBannerPrePartida] = useState(false);
  const [imagemfimPartida, setImagemfimPartida] = useState("");

  const [confirmarfimconfronto, setConfirmarfimconfronto] = useState(true);
  const formatData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const handleSaveBanner = async () => {
    //faz a renderizacao da imagem
    const bannerElement = document.getElementById(
      `BannerPartidaFinalizada${id}`
    );
    if (bannerElement) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Adiciona um atraso de 500ms
      html2canvas(bannerElement, { backgroundColor: null }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `BannerPartidaFinalizada${id}.png`;
        link.click();
      });
    }
    handleSetFinalizarPartida();
  };
  const handleImagemBannerPrePartida = () => {
    //mostrando ou nao banner pre partida
    setBannerPrePartida(!BannerdePrePartidaIsOn);
  };
  const handleSaveBannerPrePartida = async () => {
    setZoomForView(1);
    //faz a renderizacao da imagem
    const bannerElement = document.getElementById(`BannerPrePartida${id}`);
    if (bannerElement) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Adiciona um atraso de 500ms
      html2canvas(bannerElement, { backgroundColor: null }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        setZoomForView(0.22);

        link.download = `BannerPrePartida${id}.png`;
        link.click();
      });
    }
  };

  const [zoomForView, setZoomForView] = useState(0.22);

  return (
    <>
      {BannerdePrePartidaIsOn ? ( //sistema de gerar banner da partida
        <div
          style={{
            position: "fixed",
            display: "flex",
            height: "100%",
            backgroundColor: "var(--cinza)",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            zIndex: "100",
          }}
        >
          {zoomForView === 0.22 ? (
            <></>
          ) : (
            <div
              style={{
                position: "fixed",
                display: "flex",
                height: "100%",
                backgroundColor: "white",

                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "40px",
                top: 0,
                zIndex: "102",
              }}
            >
              Salvando imagem...
              <GridLoader color="var(--corazul)" size={50} />
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${zoomForView})`,
              /*BUGANDO PRA GERAR BANNER  fazer variavel que almenta de tamanho e diminui pra tirar print*/
            }}
          >
            <BannerPrePartida
              tipoConfronto={tipoConfronto}
              nomeT1={time1Nome}
              logoT1={time1Logo}
              nomeT2={time2Nome}
              logoT2={time2Logo}
              Horario={horario}
              data={formatData(data)}
              id={id}
              local={local}
            />
            {/*banner criado antes da partida comecar*/}
          </div>
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginLeft: "500px",
              padding: "30px",
              gap: "10px",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "15px",
                backgroundColor: "var(--corazul)",
                width: "100px",
                textAlign: "center",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleSaveBannerPrePartida}
            >
              Salvar
            </p>
            <p
              style={{
                color: "white",
                fontSize: "15px",
                backgroundColor: "red",
                width: "100px",
                textAlign: "center",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleImagemBannerPrePartida}
            >
              Fechar
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {BannerFimdePartida ? ( //sistema de gerar banner da partida
        <div
          style={{
            position: "fixed",
            display: "flex",
            height: "100%",
            backgroundColor: "var(--cinza)",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            zIndex: "100",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "scale(1)",
              zoom: "0.4" /*BUGANDO PRA GERAR BANNER */,
            }}
          >
            <BannerFimPartida
              tipoConfronto={tipoConfronto}
              nomeT1={time1Nome}
              logoT1={time1Logo}
              placarT1={placartime1}
              nomeT2={time2Nome}
              logoT2={time2Logo}
              placarT2={placartime2}
              data={formatData(data)}
              imagemfimPartida={imagemfimPartida}
              id={id}
            />
            {/*banner*/}
          </div>
          <p
            style={{
              color: "white",
              fontSize: "20px",
              backgroundColor: "var(--corazul)",
              width: "150px",
              textAlign: "center",
              borderRadius: "5px",
              position: "absolute",
              marginTop: "820px",
              cursor: "pointer",
            }}
            onClick={handleSaveBanner}
          >
            Salvar
          </p>
          <p
            style={{
              color: "red",
              fontSize: "25px",
              textAlign: "center",
              borderRadius: "5px",
              position: "absolute",
              marginBottom: "800px",
              marginLeft: "460px",
              cursor: "pointer",
            }}
            onClick={handlefinalizarPartida}
          >
            x
          </p>
        </div>
      ) : (
        <></>
      )}
      <div
        className="Confronto"
        style={{ position: "relative", cursor: "pointer" }}
        title="Ver banner da partida"
      >
        {confirmarfimconfronto ? (
          <div
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
            onClick={handleImagemBannerPrePartida}
          >
            <p className="TipoConfronto">
              {tipoConfronto}
              <span style={{ fontSize: "12px" }}>{formatData(data)}</span>
              <span style={{ fontSize: "12px" }}>{horario}</span>
            </p>
            <div className="LogoDosTime">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="LogotimePartidaContainer">
                  <img className="logoTimeConfronto" src={time1Logo} />
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    width: "100px",
                    textAlign: "center",
                  }}
                >
                  {time1Nome}
                </p>
              </div>
              <p style={{ fontSize: "30px" }}>X</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="LogotimePartidaContainer">
                  <img className="logoTimeConfronto" src={time2Logo} />
                </div>
                <p
                  style={{
                    fontSize: "15px",
                    width: "100px",
                    textAlign: "center",
                  }}
                >
                  {time2Nome}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <p style={{ fontSize: "20px" }}>Local:</p>
              <p
                style={{
                  fontSize: "12px",
                  height: "35px",
                  display: "flex",
                  flexWrap: "wrap",
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                {local}
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: "100%",
            }}
          >
            <h1 style={{ fontSize: "15px", fontWeight: "400" }}>
              Fim da Partida
            </h1>
            <Tooltip
              title="Insira a foto tirada na partida"
              followCursor={true}
            >
              <div style={{ border: "3px dotted var(--cinza)" }}>
                <InputfotoPartida
                  id={`fimconfronto${data}`}
                  setImagemInput={setImagemfimPartida}
                />
              </div>
            </Tooltip>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", marginBottom: "10px" }}
                >
                  <img src={time1Logo} style={{ width: "50px" }} />
                  <img src={time2Logo} style={{ width: "50px" }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    onChange={(e) => {
                      const numero = e.target.value;
                      setPlacartime1(parseInt(numero));
                    }}
                    maxLength={2}
                    className="input"
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "2px dotted black",
                      textAlign: "center",
                    }}
                  />
                  <p style={{ fontSize: "10px" }}>X</p>
                  <input
                    maxLength={2}
                    onChange={(e) => {
                      const numero = e.target.value;
                      setPlacartime2(parseInt(numero));
                    }}
                    className="input"
                    style={{
                      width: "40px",
                      height: "40px",

                      border: "2px dotted black",
                      textAlign: "center",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "200",
                    marginTop: "10px",
                  }}
                >
                  Resultado
                </p>
              </div>
              <p
                style={{
                  backgroundColor: "var(--corazul)",
                  color: "white",
                  padding: "5px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontSize: "15px",
                }}
                onClick={handlefinalizarPartida}
              >
                Finalizar
              </p>
            </div>
          </div>
        )}
        {usuarioSecao?.tipoConta === 1 && ( //Apenas ADM tem Acesso a Editar
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "-40px",
              alignItems: "center",
              gap: "20px",
              zIndex: 2,
            }}
          >
            <BiCheck
              onClick={() => {
                setConfirmarfimconfronto(!confirmarfimconfronto);
              }}
              size={20}
            />
            <div
              onClick={() => {
                HandleFetchDelete(
                  //funcao que esta no context para excluir partidas
                  "partida",
                  id,
                  SetAtualizarPartidas,
                  AtualizarPartidas
                );
              }}
            >
              <BiTrash />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Partida;
