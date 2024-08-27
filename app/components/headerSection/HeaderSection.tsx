import React from "react";
interface Props {
  NomeSecao: string;
}
/*Cabecalho das secoes com botoes de saiba mais */

const HeaderSection: React.FC<Props> = ({ NomeSecao }) => {
  return (
    <div className="HeaderSectionMain">
      <h1 className="NomeSecao">{NomeSecao}</h1>
      <p className="VermaisBtn">Ver mais</p>
    </div>
  );
};

export default HeaderSection;
