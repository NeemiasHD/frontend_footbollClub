import React from "react";
import "./Footer.css";

import Link from "next/link";
import { BsInstagram, BsTwitter, BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <>
      <div style={{ backgroundColor: "var(--corazul)" }}>
        <div className="footerMain">
          <div className="TitleContainerFooter">
            <img
              src="https://res.cloudinary.com/dtpsqmz73/image/upload/v1723651231/tdmqry1ecgxvl68jkzaj.png"
              width={100}
            />
          </div>
          <div className="Footer NavegacaoContainer">
            <h1>Navegation</h1>
            <div className="NavegacaoItensF">
              <Link href={"/"}>Home</Link>
              <Link href={"/"}>Movies</Link>
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
              <a
                href="mailto:neemiasclaudio5@gmail.com?subject=Trabalho"
                target="blank"
              >
                contact
              </a>
              <a>neemiasclaudio5@gmail.com</a>
            </div>
          </div>
          <div className="Footer SocialMediaContainer">
            <h1>Social Media</h1>
            <div className="iconsSocial">
              <a
                href="https://www.instagram.com/neemias_claudio/"
                target="blank"
              >
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
      </div>
    </>
  );
}

export default Footer;
