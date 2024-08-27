"use client";
import React, { useState } from "react";
import InputImagem from "../inputimage/InputImagem";
import {
  UploadImagemToClound,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";

function AdmCriarNoticia() {
  const [mensagem, setmensagem] = useState("");
  const { setAtualizarNoticias, atualizarNoticias, ImagemUpload } =
    UseBagresContext();
  const [IsLoading, setIsLoading] = useState(false);

  const handleCreateNoticias = async () => {
    setIsLoading(true);
    let imagem;
    if (ImagemUpload) imagem = await UploadImagemToClound(ImagemUpload);
    const noticia = {
      mensagem: mensagem,
      imagem: imagem,
      // Adicione outros campos aqui conforme necessário
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}noticia`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticia),
        }
      );

      if (response.ok) {
        // Notícia criada com sucesso
        setAtualizarNoticias(atualizarNoticias + 1);
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar notícia");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    setIsLoading(false);
  };
  return (
    <div className="Adm">
      <div
        style={{
          width: 300,
          height: 160,
          border: "3px dotted var(--cinza)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {IsLoading ? (
          <GridLoader color="#00d2ff" />
        ) : (
          <InputImagem id="noticiaimput" />
        )}
      </div>

      <input
        type="text"
        className="InputNoticia"
        id="inputMensagem"
        placeholder="Mensagem"
        onChange={(e) => setmensagem(e.target.value)}
      />
      <div className="BtnEdit">
        <p className="Btn Salvar" onClick={handleCreateNoticias}>
          Salvar
        </p>
        <p className="Btn Limpar">Limpar</p>
      </div>
    </div>
  );
}

export default AdmCriarNoticia;
