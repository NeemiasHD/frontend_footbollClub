import React from "react";
import { BiCart } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { Rating } from "react-simple-star-rating";

function Produto() {
  return (
    <div
      style={{
        width: "250px",
        height: "305px",
        backgroundColor: "white",
        boxShadow: "0px 0px 30px var(--cinzaEscuro)",
      }}
    >
      <img src="/img/testeimgloja.png" width={250} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <p style={{ fontSize: "14px", fontWeight: "200" }}>
            CAMISA BAGRES 
          </p>

          <Rating readonly={true} size={20} initialValue={5} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <BiCart />
            <BsHeart color="red" />
          </div>
          <p style={{ fontSize: "20px", fontWeight: "200" }}>49,90 R$</p>
        </div>
      </div>
    </div>
  );
}

export default Produto;
