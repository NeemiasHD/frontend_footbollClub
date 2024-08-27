import React from "react";

interface AtributeProps {
  AtributeName: string;
  defaultvalue?: number;
  SetAtributeNumber: React.Dispatch<React.SetStateAction<any>>;
}
const AtributoPlayer: React.FC<AtributeProps> = ({
  AtributeName,
  SetAtributeNumber,
  defaultvalue,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{AtributeName}</p>
      <input
        maxLength={2}
        id="input"
        className="input"
        type="number"
        style={{
          width: "80px",
          height: "30px",
          textAlign: "center",
          fontSize: "20px",
          border: " 2px solid var(--cinza)",
        }}
        defaultValue={defaultvalue}
        onChange={(e) => {
          SetAtributeNumber(e.target.value);
        }}
      />
    </div>
  );
};

export default AtributoPlayer;
