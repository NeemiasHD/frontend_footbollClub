"use client";
import { UseBagresContext } from "@/app/Context/BagresContext";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCrown, BiMenu } from "react-icons/bi";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import MenuUsuario from "./MenuUsuario";
import { IoCloseCircle } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";

function Header() {
  const { usuarioSecao, setUsuarioSecao } = UseBagresContext();
  const [menuUsuarioAtivado, setMenuUsuarioAtivado] = useState(false);
  const [cookieSiteAviso, SetcookieSiteAviso] = useState(false);

  useEffect(() => {
    const UserCookie = getCookie("cookieSiteAviso");
    if (UserCookie) {
      const cookie = JSON.parse(UserCookie);
      /*deletar os cookies da glr:  deleteCookie("Usuario");*/
      SetcookieSiteAviso(cookie);
    } else {
      setCookie("cookieSiteAviso", true, {
        path: "/",
        maxAge: 10 * 365 * 24 * 60 * 60,
      });
    }
  }, []);

  return (
    <>
      {/*inicio componente menu de usuario*/}
      {cookieSiteAviso ? (
        <div
          className="popUpAvisoSiteEmDesemvolvimento"
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",

            width: "100vw",
            height: "100vh",
            zIndex: 150,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              backgroundColor: "red",
              textAlign: "center",
              color: "white",
              maxWidth: "400px",
              bottom: 20,

              pointerEvents: "all",
            }}
          >
            <p
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                cursor: "pointer",
              }}
              onClick={() => {
                setCookie("cookieSiteAviso", false, {
                  path: "/",
                  maxAge: 10 * 365 * 24 * 60 * 60,
                });
                SetcookieSiteAviso(false);
              }}
            >
              <IoCloseCircle />
            </p>
            <p
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CiWarning />
              AVISO
              <CiWarning />
            </p>
            <p style={{ fontSize: "10px" }}>
              O site pode conter bugs e funcionalidades não disponiveis por
              conta do mesmo ainda ser um projeto em desenvolvimento, é
              planejado futuras atualizações e implementações que irão melhorar
              seu funcionamento e sua interface, contamos com sua paciencia :D
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {menuUsuarioAtivado && (
        <MenuUsuario setMenuUsuarioAtivado={setMenuUsuarioAtivado} />
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

          {usuarioSecao?.user?.foto ? (
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
                  src={usuarioSecao.user.foto}
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
