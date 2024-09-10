"use client";
import React, { useState } from "react";
import {
  UploadImagemToClound,
  UseBagresContext,
} from "@/app/Context/BagresContext";
import { GridLoader } from "react-spinners";
import InputFoto from "./InputFoto";

function AdmSalvarFotos() {
  const [data, setData] = useState<string | null>(null);

  const [descricao, setDescricao] = useState<string | null>(null);
  const { setAtualizarFotos, AtualizarFotos, ImagemUpload, usuarioSecao } =
    UseBagresContext();
  const [IsLoading, setIsLoading] = useState(false);

  const handleCreateNoticias = async () => {
    setIsLoading(true);
    let imagem;
    if (ImagemUpload) imagem = await UploadImagemToClound(ImagemUpload);
    const foto = {
      descricao: descricao,
      fotoUrl: imagem,
      data: data,
      // Adicione outros campos aqui conforme necessário
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}foto`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
          },
          body: JSON.stringify(foto),
        }
      );

      if (response.ok) {
        // Notícia criada com sucesso
        console.log(response);
        setAtualizarFotos(AtualizarFotos + 1);
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar foto");
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
          width: 350,
          height: 196,
          border: "3px dotted var(--cinza)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {IsLoading ? (
          <GridLoader color="#00d2ff" />
        ) : (
          <InputFoto id="Fotosimput" />
        )}
      </div>
      <input
        type="date"
        className="InputNoticia"
        id="inputMensagem"
        onChange={(e) => setData(e.target.value)}
      />
      <input
        type="text"
        className="InputNoticia"
        id="inputMensagem"
        placeholder="Descrição da foto"
        onChange={(e) => setDescricao(e.target.value)}
      />
      <div className="BtnEdit">
        <p className="Btn Salvar" onClick={handleCreateNoticias}>
          Salvar
        </p>
      </div>
    </div>
  );
}

export default AdmSalvarFotos;
