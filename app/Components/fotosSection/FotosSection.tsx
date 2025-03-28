"use client";
import React from "react";
import HeaderSection from "../headerSection/HeaderSection";
import AdmSalvarFotos from "./AdmSalvarFotos";
import {
  HandleFetchDelete,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { BiTrash } from "react-icons/bi";

interface Props {
  tipo?: boolean; //verifica se é renderizar a sessão de 2 formas
}
const FotosSection: React.FC<Props> = ({ tipo }) => {
  const { fotos, usuarioSecao, setAtualizarFotos, AtualizarFotos } =
    UseBagresContext();

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white ">
        {/* Grid container para fotos */}
        <div className="columns-1 sm:columns-2 lg:columns-3 max-w-[955px] [column-gap:0] items-center">
          {/* Condição para exibir o componente de administração */}
          {usuarioSecao?.user?.role === "admin" && <AdmSalvarFotos />}

          {/* Renderização das fotos */}
          {!tipo ? fotos.slice(0, 7).map((foto) => (
            <div
              key={foto.id}
              className="relative break-inside-avoid p-1  "

              title={`${foto.descricao} ${foto.data}`}
            >
              <img
                src={foto.fotoUrl}
                className="w-full object-cover rounded-lg"
                alt={foto.descricao}
              />
              {usuarioSecao?.user?.role === "admin" && (
                <div
                  className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full cursor-pointer"
                  onClick={() => {
                    HandleFetchDelete(
                      "foto",
                      foto.id,
                      setAtualizarFotos,
                      AtualizarFotos,
                      usuarioSecao.token
                    );
                  }}
                >
                  <BiTrash />
                </div>
              )}
            </div>
          )) : fotos.map((foto) => (
            <div
              key={foto.id}
              className="relative break-inside-avoid p-1  "

              title={`${foto.descricao} ${foto.data}`}
            >
              <img
                src={foto.fotoUrl}
                className="w-full object-cover rounded-lg"
                alt={foto.descricao}
              />
              {usuarioSecao?.user?.role === "admin" && (
                <div
                  className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full cursor-pointer"
                  onClick={() => {
                    HandleFetchDelete(
                      "foto",
                      foto.id,
                      setAtualizarFotos,
                      AtualizarFotos,
                      usuarioSecao.token
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
