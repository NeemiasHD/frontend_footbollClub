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
        }}
      >
        <img className="imgNews" style={{ width: "100%" }} src={imagem} />
      </div>
    </div>
  );
};

export default NewsComponent;
