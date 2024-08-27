"use client";
import { RenderLogo } from "@/app/Context/BagresContext";
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
  const [imgt1, setImgt1] = useState<string>("");
  const [imgt2, setImgt2] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const logo = await RenderLogo(logoT1);
      const logo2 = await RenderLogo(logoT2);
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
    <div
      id={`BannerPartidaFinalizada${id}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--corazul)",
        height: "1920px",
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
            width: "1280px",
            position: "absolute",
            right: "-100px",
            zIndex: "20",
          }}
        />
        <img
          src="./img/modelobannersite.png"
          style={{
            height: "1940px",
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
          bottom: 110,
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
              height: "230px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={imgt1} width={230} style={{}} />
          </div>
          <p
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: "white",
              width: "300px",
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
              height: "230px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={imgt2} width={230} />
          </div>

          <p
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: "white",
              width: "300px",
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
            top: "-1314px",
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
      </div>
    </div>
  );
};

export default BannerFimPartida;
