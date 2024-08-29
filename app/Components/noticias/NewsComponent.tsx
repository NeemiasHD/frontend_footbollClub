import React from "react";
interface Props {
  mensagem: string;
  imagem: string;
}
const NewsComponent: React.FC<Props> = ({ mensagem, imagem }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "394px",
        overflow: "hidden",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img className="imgNews" src={imagem} />
      <p className="NoticiaMensagem">{mensagem}</p>
    </div>
  );
};

export default NewsComponent;
