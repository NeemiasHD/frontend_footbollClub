"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputfotodeperfilUser from "./InputfotodeperfilUser";

import {
  UploadImagemToClound,
  UseBagresContext,
} from "../Context/BagresContext";

export default function Page() {
  const { ImagemUpload } = UseBagresContext();

  const [nome, setNome] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [senha, setSenha] = useState<string | null>(null);

  const HandleCriarConta = async () => {
    //criando conta
    let r;
    if (ImagemUpload) r = await UploadImagemToClound(ImagemUpload); //fazendo upload para o cloudnary

    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
      foto: r,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}usuario`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        }
      );

      if (response.ok) {
        // usuario criada com sucesso
      } else {
        // Erro ao criar notícia
        alert("Erro ao criar usuario");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "50px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          //login area
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "var(--cinzaEscuro)",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
          padding: "40px",
          borderRadius: "20px",
        }}
      >
        <h1 style={{ color: "white" }}>Criar Conta</h1>
        <InputfotodeperfilUser id="usuario" />
        <input
          type="text"
          className="input"
          placeholder="Insira o nome de usuario"
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
          }}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <input
          type="text"
          className="input"
          placeholder="Insira o email"
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          className="input"
          placeholder="Crie uma senha"
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
          }}
          onChange={(e) => {
            setSenha(e.target.value);
          }}
        />
        <input
          type="password"
          className="input"
          placeholder="Repita a senha"
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
          }}
        />
        <p
          onClick={HandleCriarConta}
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
            backgroundColor: "var(--corazul)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Criar conta
        </p>
        <p style={{ color: "white" }}>
          Ja tem uma conta?
          <Link
            href={"/Login"}
            style={{
              color: "var(--corazul)",
              marginLeft: "4px",
              textDecoration: "none",
            }}
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
