"use client";
import Link from "next/link";
import React, { useState } from "react";
import { UseBagresContext } from "../Context/BagresContext";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { CgProfile } from "react-icons/cg";
import "./Login.css";
import { GridLoader } from "react-spinners";
export default function Page() {
  const [email, setEmail] = useState<string | null>(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [senha, setSenha] = useState<string | null>(null);
  const { setUsuarioSecao } = UseBagresContext();
  const router = useRouter();

  const HandleEntrarNaConta = async () => {
    //cookies
    setIsLoading(true);
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
        height: "90vh",
        backgroundImage:
          "url(https://res.cloudinary.com/dtpsqmz73/image/upload/v1724177531/eybmqr04rvhd6dwzjvx2.png)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "400px",
          overflow: "hidden",
          boxShadow: "0px 0px 40px var(--cinza)",
        }}
      >
        <div
          className="loginArea"
          style={{
            //login area
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)",
            padding: "40px",
          }}
        >
          <h1
            style={{
              color: "gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            <CgProfile size={50} />
            Acesse sua conta
          </h1>
          <input
            type="text"
            className="input"
            placeholder="Insira o Email"
            style={{
              width: "170px",
              height: "20px",
              padding: "10px",
              fontSize: "9px",
              border: "1px solid gray",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="input"
            placeholder="digite a senha"
            style={{
              width: "170px",
              height: "20px",
              padding: "10px",
              fontSize: "9px",
              border: "1px solid gray",
            }}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
          />
          <button
            onClick={HandleEntrarNaConta}
            style={{
              width: "170px",
              height: "20px",
              padding: "10px",
              backgroundColor: "var(--corazul)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "none",
            }}
          >
            Entrar
          </button>
          <p
            style={{
              color: "gray",
              fontSize: "12px",
              textAlign: "center",
              width: "150px",
            }}
          >
            Não tem uma conta?
            <Link
              href={"/Cadastro"}
              style={{
                color: "var(--corazul)",
                textDecoration: "none",
                marginLeft: "4px",
                fontSize: "12px",
              }}
            >
              cadastre
            </Link>
          </p>
          <div style={{ position: "absolute", bottom: 10 }}>
            {IsLoading ? <GridLoader color="#00d2ff" size={10} /> : <></>}
          </div>
        </div>
        <div
          className="LoginImg"
          style={{
            backgroundColor: "var(--corazul)",
            width: "200px",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img src="./img/logobagres.png" width={150} style={{ zIndex: 2 }} />
          <img
            src="https://res.cloudinary.com/dtpsqmz73/image/upload/v1723496250/uy8bjyjemmb3lb9cuugt.png"
            style={{ height: "100%", position: "absolute", zIndex: 1 }}
          />
        </div>
      </div>
    </div>
  );
}
