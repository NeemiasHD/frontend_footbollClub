import React from "react";
interface Props {
  imagem: string;
}
const NewsComponent: React.FC<Props> = ({ imagem }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
        textAlign: "center",

      }}
    >
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <img className="imgNews" src={imagem} />
      </div>
    </div>
  );
};

export default NewsComponent;
