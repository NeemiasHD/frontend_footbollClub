"use client";
import { UseBagresContext } from "@/app/Context/BagresContext";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCrown, BiMenu } from "react-icons/bi";
import { BsInstagram, BsTwitter } from "react-icons/bs";

function Header() {
  const { usuarioSecao, setUsuarioSecao } = UseBagresContext();
  const [menuUsuarioAtivado, setMenuUsuarioAtivado] = useState(false);
  const [showUsuarios, setShowUsuarios] = useState(false);

  type usuario = {
    tipoConta: number;
    usuarioId: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
  };
  const [usuarios, setusuarios] = useState<usuario[]>([]);
  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BAGRES}usuario`
        );
        const data = await response.json();
        setusuarios(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    getUsuarios();
  }, []);

  return (
    <>
      {/*inicio componente menu de usuario*/}

      {menuUsuarioAtivado && usuarioSecao && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "fixed",
              display: "flex",
              flexDirection: "column",
              zIndex: 100,
              padding: "10px",
              backgroundColor: "var(--brancotransparente)",
              gap: "20px",
              maxWidth: "300px",
              width: "50%",
              textAlign: "center",
              marginTop: "90px",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 10px var(--cinza)",
              paddingTop: "50px",
              paddingBottom: "50px",
              backdropFilter: "blur(5px)",
            }}
          >
            {showUsuarios ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p
                  onClick={() => {
                    setShowUsuarios(!showUsuarios);
                  }}
                  style={{
                    color: "gray",
                    position: "absolute",
                    right: 5,
                    top: -3,
                    cursor: "pointer",
                  }}
                >
                  x
                </p>
                {usuarios.map((u) => (
                  <div
                    key={u.usuarioId}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        overflow: "hidden",
                        alignItems: "center",
                        display: "flex",
                        borderRadius: "20px",
                      }}
                    >
                      <img src={u.foto} style={{ width: "110%" }} />
                    </div>
                    <p>{u.nome}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p
                  onClick={() => {
                    setMenuUsuarioAtivado(!menuUsuarioAtivado);
                  }}
                  style={{
                    color: "red",
                    position: "absolute",
                    right: 5,
                    top: -3,
                    cursor: "pointer",
                  }}
                >
                  x
                </p>
                {usuarioSecao.tipoConta === 1 && (
                  <p
                    style={{
                      color: "black",
                      textShadow: "1px 1px 1px",
                      position: "absolute",
                      top: 30,
                    }}
                  >
                    <BiCrown />
                  </p>
                )}
                <img
                  src={usuarioSecao.foto}
                  style={{
                    width: "150px",
                    alignSelf: "center",
                    borderRadius: "10px",
                  }}
                />
                <div>
                  {/*info usuario */}
                  <p style={{ fontSize: "12px" }}>{usuarioSecao.nome}</p>
                  <p style={{ fontSize: "12px" }}>{usuarioSecao.email}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <BsInstagram />
                    <input
                      type="text"
                      className="input"
                      placeholder="link do seu instagram"
                      style={{
                        border: "1px solid black",
                        fontSize: "9px",
                        padding: "4px",
                        width: "200px",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      pointerEvents: "none",
                    }}
                  >
                    <BsTwitter />

                    <input
                      type="text"
                      className="input"
                      placeholder="link do seu instagram"
                      style={{
                        border: "1px solid black",
                        fontSize: "9px",
                        padding: "4px",
                        width: "200px",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20PX" }}
                >
                  {/*Botoes */}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "var(--corazul)",
                      cursor: "pointer",
                      border: "1px solid var(--corazul)",
                      width: "70px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setShowUsuarios(true);
                    }}
                  >
                    Usuarios
                  </p>
                  <p
                    onClick={() => {
                      setUsuarioSecao(null);
                      deleteCookie("Usuario");
                      setMenuUsuarioAtivado(false);
                    }}
                    style={{
                      fontSize: "12px",
                      color: "red",
                      cursor: "pointer",
                      border: "1px solid red",
                      width: "70px",
                      textAlign: "center",
                    }}
                  >
                    Logout
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/*fim componente menu de usuario*/}
      <div className="HeaderContainer" style={{ alignItems: "center" }}>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <img className="logoBagresHeader" src="./img/logobagres.png" />
        </Link>

        <div className="HeaderNav" id="HeaderNav">
          <p className="NavBtn">Notícias</p>
          <p className="NavBtn">Calendário</p>
          <p className="NavBtn">Estatísticas</p>
          <p className="NavBtn">Jogadores</p>
          <p className="NavBtn">Fotos</p>
          <Link href={"/Bagrescup"} className="NavBtn">
            Bagres CUP
          </Link>
          <p className="NavBtn">Loja</p>

          {usuarioSecao?.foto ? (
            <>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  onClick={() => {
                    setMenuUsuarioAtivado(!menuUsuarioAtivado);
                  }}
                  src={usuarioSecao.foto}
                  style={{ height: "100%", cursor: "pointer" }}
                />
              </div>
            </>
          ) : (
            <Link
              href={"/Login"}
              className="NavBtn"
              style={{ textDecoration: "none" }}
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
