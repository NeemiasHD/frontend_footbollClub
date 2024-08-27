import React from "react";
interface ResultadoPartidaProps {
  tipoConfronto: string;
  data: string;
  nomeT1: string;
  nomeT2: string;
  logoT1: string;
  logoT2: string;
  PlacarT1: number;
  PlacarT2: number;
  id: number;
}

const PartidaFinalizada: React.FC<ResultadoPartidaProps> = ({
  tipoConfronto,
  data,
  logoT1,
  logoT2,
  nomeT1,
  nomeT2,
  PlacarT1,
  PlacarT2,
}) => {
  return (
    <div className="mainPartidaFinalizada">
      <p className="TipoPartidaFinalizada">{tipoConfronto}</p>
      <div className="ContainerInfoPartidaFinalizada">
        <div className="TimesPartidaFinalizada">
          <div className="TimePartidaFinalizada">
            <img src={logoT1} className="ImagemTimePartidaFinalizada" />
            <p className="NomeTimePartidaFinalizada">{nomeT1}</p>
          </div>
          <div className="TimePartidaFinalizada">
            <img src={logoT2} className="ImagemTimePartidaFinalizada" />
            <p className="NomeTimePartidaFinalizada">{nomeT2}</p>
          </div>
        </div>
        <div className="PlacarPartidasFinalizada">
          <p>{PlacarT1}</p>
          <p>{PlacarT2}</p>
        </div>
        <div className="DataPartidaFinalizada">
          <p className="FimPartida">FIM</p>
          <p className="DataPartidaFinalizada">{data}</p>
        </div>
      </div>
    </div>
  );
};

export default PartidaFinalizada;
