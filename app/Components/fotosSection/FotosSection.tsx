"use client";
import React from "react";
import HeaderSection from "../headerSection/HeaderSection";
import AdmSalvarFotos from "./AdmSalvarFotos";
import {
  HandleFetchDelete,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { BiTrash } from "react-icons/bi";

function FotosSection() {
  const { fotos, usuarioSecao, setAtualizarFotos, AtualizarFotos } =
    UseBagresContext();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "40px",
          backgroundColor: "white",
          flexDirection: "column",
          padding: "50px",
        }}
      >
        <HeaderSection NomeSecao={"Fotos"} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "1150px",
            gap: "10px",
            marginTop: "40px",
          }}
        >
          {usuarioSecao?.tipoConta === 1 && ( //Apenas ADM tem Acesso a Editar
            <AdmSalvarFotos />
          )}
          {fotos.map((foto) => (
            <div
              key={foto.id}
              style={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
              title={foto.descricao + " " + foto.data}
            >
              <img src={foto.fotoUrl} style={{ height: "100%" }} />
              {usuarioSecao?.tipoConta === 1 && ( //Apenas ADM tem Acesso a Editar
                <div
                  style={{
                    position: "absolute",
                    color: "white",
                    right: "5px",
                    bottom: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    HandleFetchDelete(
                      "foto",
                      foto.id,
                      setAtualizarFotos,
                      AtualizarFotos
                    );
                  }}
                >
                  <BiTrash />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FotosSection;
