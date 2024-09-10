"use client";
import React, { useEffect } from "react";
import "./InputProdutoImg.css";
import { FaRegImage } from "react-icons/fa";
import { UseBagresContext } from "@/app/Context/BagresContext";

function reduzirResolucao(
  imagem: HTMLImageElement,
  novaLargura: number
): HTMLImageElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Contexto 2D nao suportado");
  }

  // Calcula a nova altura proporcionalmente Ã  nova largura
  const proporcao = novaLargura / imagem.width;
  const novaAltura = imagem.height * proporcao;

  canvas.width = novaLargura;
  canvas.height = novaAltura;

  ctx.drawImage(imagem, 0, 0, novaLargura, novaAltura);

  const imagemReduzida = new Image();
  imagemReduzida.src = canvas.toDataURL("image/png");

  return imagemReduzida;
}

// Tipos das propriedades do componente
interface InputImagemProps {
  Background?: string;
  id?: string;
  limparImagem?: boolean;
  setlimparImagem?: (valor: boolean) => void;
}

const InputProdutoImg: React.FC<InputImagemProps> = ({
  Background,
  id,
  limparImagem,
  setlimparImagem,
}) => {
  const { SetImagemUpload } = UseBagresContext();

  useEffect(() => {
    if (limparImagem) {
      const imagemPreview = document.getElementById(
        `ImagemPreview${id}`
      ) as HTMLImageElement;
      const btnAdd = document.getElementById(`btnAdd${id}`) as HTMLElement;
      const imagemInput = document.getElementById(
        `ImagemInput${id}`
      ) as HTMLInputElement;

      if (imagemPreview && btnAdd && imagemInput && setlimparImagem) {
        imagemPreview.src = "";
        btnAdd.style.display = "flex";
        imagemInput.value = "";
        setlimparImagem(false);
      }
    }
  }, [limparImagem, id, setlimparImagem]);

  return (
    <>
      <input
        type="file"
        id={`ImageInputProduto${id}`}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            SetImagemUpload(file);
            const reader = new FileReader();
            reader.onload = function (e) {
              const imagemOriginal = new Image();
              imagemOriginal.src = e.target?.result as string;
              imagemOriginal.onload = function () {
                const novaLargura = 100;
                const imagemReduzida = reduzirResolucao(
                  imagemOriginal,
                  novaLargura
                ).src;
                const imagemPreview = document.getElementById(
                  `ImagemPreview${id}`
                ) as HTMLImageElement;
                const btnAdd = document.getElementById(
                  `btnAdd${id}`
                ) as HTMLElement;

                if (imagemPreview && btnAdd) {
                  imagemPreview.src = imagemReduzida;
                  btnAdd.style.display = "none";
                  imagemPreview.style.filter = "blur(0px)";
                }
              };
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <label htmlFor={`ImageInputProduto${id}`} className="ImageInputProduto">
        <div className="botaoadd" id={`btnAdd${id}`}>
          <FaRegImage />
        </div>

        {Background != `undefinided` ? (
          <img
            src={Background}
            className="ImagemPreview"
            id={`ImagemPreview${id}`}
            style={{ height: "100%" }}
          />
        ) : (
          <img
            src=""
            style={{ height: "100%" }}
            className="ImagemPreview"
            id={`ImagemPreview${id}`}
          />
        )}
      </label>
    </>
  );
};

export default InputProdutoImg;
