"use client";
import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import AdmEditarCardPlayer from "./AdmEditarCardPlayer";
import { RenderLogo, UseBagresContext } from "@/app/Context/BagresContext";
interface CardProp {
  jogadorId: number;
  cardBanner: string;
  tipoCarta?: number;
  foto: string;
  posicao: string;
  nome: string;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  gols: number;
  assistencias: number;
  bagreDaPartida: number;
  numCamisa: number;
}
const Cardplayer: React.FC<CardProp> = ({
  jogadorId,
  cardBanner,
  tipoCarta,
  posicao,
  foto,
  nome,
  pac,
  sho,
  pas,
  dri,
  def,
  phy,
  gols,
  assistencias,
  bagreDaPartida,
  numCamisa,
}) => {
  const [alterarPlayerIsOn, setAlterarPlayerIsOn] = useState(false); //controla a alteracao do jogador
  const { usuarioSecao } = UseBagresContext();
  const [Foto, SetFOTO] = useState<string>("");

  const handleSaveCard = () => {
    const bannerElement = document.getElementById(`MainCard${jogadorId}`);
    if (bannerElement)
      html2canvas(bannerElement, { backgroundColor: null }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `Card_do_${nome}.png`;
        link.click();
      });
  };
  useEffect(() => {
    const fetchImage = async () => {
      const FOTO = await RenderLogo(foto);
      if (FOTO) {
        SetFOTO(FOTO);
      }
    };
    fetchImage();
  }, [foto]);

  return alterarPlayerIsOn ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AdmEditarCardPlayer
        nomeEDIT={nome}
        fotoEDIT={foto}
        pacEDIT={pac}
        shoEDIT={sho}
        pasEDIT={pas}
        driEDIT={dri}
        defEDIT={def}
        phyEDIT={phy}
        posicaoEDIT={posicao}
        jogadorId={jogadorId}
        golsEDIT={gols}
        assistenciasEDIT={assistencias}
        bagreDaPartida={bagreDaPartida}
        numCamisa={numCamisa}
        setAlterarPlayerIsOn={setAlterarPlayerIsOn}
      />
    </div>
  ) : (
    <div
      className="MainCard"
      id={`MainCard${jogadorId}`}
      onClick={handleSaveCard}
    >
      <div
        style={
          tipoCarta
            ? {
                position: "absolute",
                width: "240px",
                height: "50px",
                top: "165px",
                zIndex: "2",

                backgroundImage:
                  "linear-gradient(to top, var(--douradocarta), transparent)",
              }
            : {
                position: "absolute",
                width: "240px",
                height: "50px",
                top: "165px",
                zIndex: "2",

                backgroundImage:
                  "linear-gradient(to top, var(--cinzacarta), transparent)",
              }
        }
      ></div>
      <img className="cardImg" src={cardBanner} />
      <div className="atributo picContainer">
        <img className="playerpic" src={Foto} />
      </div>
      <p className="atributo overall">
        {Math.round((pac + sho + pas + dri + def + phy) / 6)}
      </p>
      <p className="atributo posicao">{posicao}</p>
      <p className="atributo nomeJogador">{nome}</p>
      <p className="atributo pac">{pac}</p>
      <p className="atributo sho">{sho}</p>
      <p className="atributo pas">{pas}</p>
      <p className="atributo dri">{dri}</p>
      <p className="atributo def">{def}</p>
      <p className="atributo phy">{phy}</p>
      {usuarioSecao?.tipoConta === 1 && ( //Apenas ADM tem Acesso a Editar
        <div
          style={{ position: "absolute", bottom: "-25px", fontSize: "20px" }}
          onClick={() => {
            setAlterarPlayerIsOn(!alterarPlayerIsOn);
          }}
        >
          <BiEdit />
        </div>
      )}
    </div>
  );
};

export default Cardplayer;
