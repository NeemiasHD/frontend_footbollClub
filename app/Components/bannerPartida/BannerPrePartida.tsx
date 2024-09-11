"use client";
import { RenderImagemParaCanvas } from "@/app/Context/BagresContext";
import React, { useEffect, useState } from "react";

interface PartidaProps {
  tipoConfronto: string;
  data: string;
  nomeT1: string;
  nomeT2: string;
  logoT1: string;
  logoT2: string;
  Horario: string;
  local: string;
  id: number;
}
const BannerPrePartida: React.FC<PartidaProps> = ({
  logoT1,
  logoT2,
  nomeT1,
  nomeT2,
  tipoConfronto,
  data,
  id,
  Horario,
  local,
}) => {
  const [imgt1, setImgt1] = useState<string>("");
  const [imgt2, setImgt2] = useState<string>("");
  const [imgt3, setImgt3] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const logo = await RenderImagemParaCanvas(logoT1);
      const logo2 = await RenderImagemParaCanvas(logoT2);
      const logo3 = await RenderImagemParaCanvas(
        "https://res.cloudinary.com/dtpsqmz73/image/upload/v1724644921/vkjxb2cwyq5rudnx4xuu.png"
      );
      if (logo) {
        setImgt1(logo);
      }
      if (logo2) {
        setImgt2(logo2);
      }
      if (logo3) {
        setImgt3(logo3);
      }
    };
    fetchImage();
  }, [logoT1]);

  return (
    <div
      id={`BannerPrePartida${id}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          src="./img/FundoPrePartida.png"
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
          top: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "300px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "50px",
              fontWeight: "800",
              color: "white",
              width: "400px",
              textAlign: "center",
              textShadow: "5px 5px 1px var(--cinza)",
              height: "100px",
            }}
          >
            {nomeT1.toLocaleUpperCase()}
          </p>
          <div
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <img src={imgt1} width={450} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "50px",
              fontWeight: "800",
              color: "white",
              width: "400px",
              textAlign: "center",
              textShadow: "5px 5px 1px var(--cinza)",
              height: "100px",
            }}
          >
            {nomeT2.toLocaleUpperCase()}
          </p>
          <div
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <img src={imgt2} width={450} />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: "700px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "50px",
              textShadow: "0px 4px 5px var(--cinza)",
              marginBottom: "60px",
            }}
          >
            {tipoConfronto}
          </p>
          <p
            style={{
              color: "white",
              fontSize: "80px",
              fontWeight: "900",
              textShadow: "0px 4px 5px var(--cinza)",
            }}
          >
            {data} as {Horario}
          </p>
          <p
            style={{
              color: "white",
              fontSize: "50px",
              width: "700px",
              textAlign: "center",
              textShadow: "0px 4px 5px var(--cinza)",
            }}
          >
            {local}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerPrePartida;
