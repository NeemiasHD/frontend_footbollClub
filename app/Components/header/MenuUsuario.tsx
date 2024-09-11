"use cliente";
import { UseBagresContext } from "@/app/Context/BagresContext";
import React, { useEffect, useState } from "react";
import { BiCart, BiGroup, BiUser } from "react-icons/bi";
import { deleteCookie } from "cookies-next";
import { BsHeart } from "react-icons/bs";
import "./MenuUsuario.css";

interface MenuUsuarioProps {
  setMenuUsuarioAtivado: (ativo: boolean) => void;
}

const MenuUsuario: React.FC<MenuUsuarioProps> = ({ setMenuUsuarioAtivado }) => {
  const [showUsuarios, setShowUsuarios] = useState(false);
  const { usuarioSecao, setUsuarioSecao } = UseBagresContext();
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
          `${process.env.NEXT_PUBLIC_API_BAGRES}usuario`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${usuarioSecao?.token}`,
            },
          }
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
    <div
      style={{
        position: "fixed",
        display: "flex",
        height: "100%",
        backgroundColor: "var(--cinzaEscuro)",
        backdropFilter: "blur(5px)",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        zIndex: "100",
      }}
    >
      {usuarioSecao && (
        <div
          style={{
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            zIndex: 100,
            backgroundColor: "white",
            gap: "20px",
            maxWidth: "250px",
            width: "50%",
            textAlign: "center",
            top: "100px",
            alignItems: "center",
            boxShadow: "0px 0px 10px var(--cinza)",
            height: "100%",
            maxHeight: "400px",
          }}
        >
          {showUsuarios ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  overflowY: "scroll",
                  height: "80%",
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
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {usuarios.map((u) => (
                    <div
                      key={u.usuarioId}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        width: "100px",
                        height: "100px",
                        backgroundColor: "var(--cinza)",
                        borderRadius: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          overflow: "hidden",
                          alignItems: "center",
                          display: "flex",
                          borderRadius: "50px",
                          justifyContent: "center",
                          backgroundColor: "white",
                        }}
                      >
                        <img src={u.foto} style={{ height: "100%" }} />
                      </div>
                      <p style={{ fontSize: "9px" }}>{u.nome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  backgroundImage:
                    "url(https://res.cloudinary.com/dtpsqmz73/image/upload/v1724902887/wujuzwihs3eabqkqezyx.png)",
                  backgroundSize: "cover",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "150px",
                }}
              >
                <p
                  onClick={() => {
                    setMenuUsuarioAtivado(false);
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
                {usuarioSecao.user.role === "admin" && (
                  <p
                    style={{
                      color: "black",
                      textShadow: "1px 1px 1px",
                      position: "absolute",
                      top: 30,
                    }}
                  >
                    {/*COISA DE ADM*/}
                  </p>
                )}
                <div
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    position: "relative",
                    height: "150px",
                    paddingTop: "50px",
                    marginTop: "70px",
                    width: "90%",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      overflow: "hidden",
                      borderRadius: "50px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      position: "absolute",
                      top: "-50px",
                    }}
                  >
                    <img
                      src={usuarioSecao.user.foto}
                      style={{
                        height: "100%",
                        alignSelf: "center",
                      }}
                    />
                  </div>

                  {/*info usuario */}
                  <p style={{ fontSize: "12px" }}>{usuarioSecao.user.nome}</p>
                  <p style={{ fontSize: "12px" }}>{usuarioSecao.user.email}</p>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  gap: "20px",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                {/*btn opcao menu usuario*/}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "start",
                    borderBottom: "1px solid var(--cinza)",
                    height: "30px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    <BiUser />
                    <p
                      className="MenuUserOpcao"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "10px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                    >
                      Minha Conta
                    </p>
                  </div>
                </div>
                {/*btn opcao menu usuario*/}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                    width: "100%",
                    height: "30px",
                    alignItems: "start",
                    borderBottom: "1px solid var(--cinza)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    <BiGroup />
                    <p
                      className="MenuUserOpcao"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "10px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowUsuarios(true);
                      }}
                    >
                      Comunidade
                    </p>
                  </div>
                </div>
                {/*btn opcao menu usuario*/}
                {/*Desativado*/}
                <div
                  style={{
                    display: "none",
                    gap: "10px",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "start",
                    height: "30px",
                    borderBottom: "1px solid var(--cinza)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    <BiCart />
                    <p
                      className="MenuUserOpcao"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "10px",
                        marginLeft: "30px",
                      }}
                    >
                      Carrinho
                    </p>
                  </div>
                </div>
                {/*btn opcao menu usuario*/}
                {/*Desativado*/}
                <div
                  style={{
                    display: "none",
                    gap: "10px",
                    flexDirection: "column",
                    width: "100%",
                    height: "30px",
                    alignItems: "start",
                    borderBottom: "1px solid var(--cinza)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      marginLeft: "30px",
                    }}
                  >
                    <BsHeart />

                    <p
                      className="MenuUserOpcao"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "10px",
                        marginLeft: "30px",
                      }}
                    >
                      Favoritos
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                {/*Botoes */}
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
                    width: "100px",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  Logout
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuUsuario;
