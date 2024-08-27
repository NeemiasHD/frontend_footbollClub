import React from "react";
interface Props {
  mensagem: string;
  imagem: string;
}
const NewsComponent: React.FC<Props> = ({ mensagem, imagem }) => {
  return (
    <div>
      <div
        style={{
          width: "700px",
          height: "394px",
          overflow: "hidden",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img className="imgNews" src={imagem} />
      </div>
      <p className="NoticiaMensagem">{mensagem}</p>
    </div>
  );
};

export default NewsComponent;
