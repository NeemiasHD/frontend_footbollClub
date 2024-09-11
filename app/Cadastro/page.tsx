"use client";
import Link from "next/link";
import React, { useState } from "react";
import InputfotodeperfilUser from "./InputfotodeperfilUser";

import {
  UploadImagemToClound,
  UseBagresContext,
} from "../Context/BagresContext";
import { GridLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function Page() {
  const [IsLoading, SetIsLoading] = useState(false);

  const { ImagemUpload, setUsuarioSecao } = UseBagresContext();

  const [nome, setNome] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [senha, setSenha] = useState<string | null>(null);
  const router = useRouter();
  const HandleCriarConta = async () => {
    //criando conta
    SetIsLoading(true);
    let r;

    if (nome && email && senha) {
      //tratamento de erro:

      if (ImagemUpload) {
        r = await UploadImagemToClound(ImagemUpload);
      } else {
        SetIsLoading(false);

        return alert("insira uma foto de perfil");
      } //fazendo upload para o cloudnary
    } else {
      SetIsLoading(false);

      return alert("informações incompletas");
    }

    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
      Role: "",
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
        HandleEntrarNaConta();

        // usuario criada com sucesso
      } else {
        // Erro ao criar notícia
        console.log(response);
        alert("Erro ao criar usuario");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    SetIsLoading(false);
  };

  /*LOGAR */

  const HandleEntrarNaConta = async () => {
    //cookies
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BAGRES
        }Usuario/login?email=${email?.toLowerCase()}&senha=${senha}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // usuario criada com sucesso
        const data = await response.json();
        console.log(data);
        setUsuarioSecao(data);
        setCookie("Usuario", JSON.stringify(data), {
          path: "/",
          maxAge: 10 * 365 * 24 * 60 * 60,
        });

        router.push("/");
      } else {
        // Erro ao criar notícia
        alert("usuario nao encontrado");
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
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundImage:
          "url(https://res.cloudinary.com/dtpsqmz73/image/upload/v1724177531/eybmqr04rvhd6dwzjvx2.png)",
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
          width: "350px",
          height: "640px",
          margin: "50px",
        }}
      >
        {IsLoading ? (
          <GridLoader color="#00d2ff" />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
