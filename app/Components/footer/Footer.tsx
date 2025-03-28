'use client'
import React from "react";
import "./Footer.css";

import Link from "next/link";
import { BsInstagram, BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";
import { UseBagresContext } from "@/app/Context/BagresContext";

function Footer() {
  const { usuarioSecao, setPopUpNoticia } = UseBagresContext();

  return (
    <>
      <div style={{ backgroundColor: "var(--corazul)", position: "relative" }}>
        <div className="footerMain">
          <div
            className="TitleContainerFooter"
            style={{ flexDirection: "column", display: "flex" }}
          >
            <img
              src="https://res.cloudinary.com/dtpsqmz73/image/upload/v1723651231/tdmqry1ecgxvl68jkzaj.png"
              width={100}
            />
            <p className="mt-10 text-center text-white">Patrocínios:</p>
            <img src="./img/patrocinio1.png" width={100} />
            <img src="./img/patrocinio2.png" width={100} />
          </div>
          <div className="Footer NavegacaoContainer">
            <h1>Navegation</h1>
            <div className="NavegacaoItensF">
              <Link href={"/"}>Home</Link>
              <a onClick={() => {
                setPopUpNoticia(true)
              }}>Notícias</a>
              <Link href={"/Calendario"}>Calendário</Link>
              <Link href={"/Loja"}>Loja</Link>
              <Link href={"/Resultados"}>Estatísticas</Link>
              <Link href={"/Jogadores"}>Jogadores</Link>
              <Link href={"/Fotos"}>Fotos</Link>
              <Link href={"/Bagrescup"}>Bagres CUP</Link>
            </div>
          </div>
          <div className="Footer ContatoContainer">
            <h1>Contact</h1>
            <div className="ContatoItensF">
              <a
                href="https://github.com/NeemiasHD?tab=repositories"
                target="blank"
              >
                Portfolio
              </a>
              <a
                href="https://neemiashd.github.io/Meu_Portifolio/"
                target="blank"
              >
                Repository
              </a>

              <a>bagresgoianos@gmail.com</a>
            </div>
          </div>
          <div className="Footer SocialMediaContainer">
            <h1>Social Media</h1>
            <div className="iconsSocial">
              <a href="https://www.instagram.com/bagresfc_go/" target="blank">
                <BsInstagram className="icon instagram" />
              </a>
              <a href="https://x.com/neemiasclaudio5" target="blank">
                <BsTwitter className="icon twitter" />
              </a>
              <a
                href="https://www.linkedin.com/in/neemias-claudio-957267302/"
                target="blank"
              >
                <BsGithub className="icon telegram" />
              </a>
              <a href="https://github.com/NeemiasHD" target="blank">
                <BsLinkedin className="icon github" />
              </a>
            </div>
          </div>
        </div>
        <div className="FooterCopyright">
          <p>&copy; 2024 Bagres F.C. All rights reserved.</p>
        </div>
        <p
          className="WebsiteVersion"
          style={{
            color: "white",
            position: "absolute",
            right: "10px",
            bottom: "0",
            fontSize: "10px",
          }}
        >
          v1.2.5
        </p>
      </div>
    </>
  );
}

export default Footer;
