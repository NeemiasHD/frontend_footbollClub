import { UseBagresContext } from "@/app/Context/BagresContext";
import React from "react";
import { GrReturn } from "react-icons/gr";

interface ResultadoPartidaProps {
  tipoConfronto: string;
  data: string;
  nomeT1: string;
  nomeT2: string;
  logoT1: string;
  logoT2: string;
  PlacarT1: number;
  PlacarT2: number;
  id: number; //partida

  //dados para voltar a partida para não finalizada:
  T1_empates: number;
  T2_empates: number;
  T1_vitorias: number;
  T2_vitorias: number;
  T1_derrotas: number;
  T2_derrotas: number;
  T1_golsFeitos: number;
  T2_golsFeitos: number;
  T1_golsSofridos: number;
  T2_golsSofridos: number;
  T1_id: number;
  T2_id: number;
}

const PartidaFinalizada: React.FC<ResultadoPartidaProps> = ({
  tipoConfronto,
  data,
  logoT1,
  logoT2,
  nomeT1,
  nomeT2,
  PlacarT1,
  PlacarT2,
  id, //partida
  T1_empates,
  T2_empates,
  T1_vitorias,
  T2_vitorias,
  T1_derrotas,
  T2_derrotas,
  T1_golsFeitos,
  T2_golsFeitos,
  T1_golsSofridos,
  T2_golsSofridos,
  T1_id,
  T2_id,
}) => {
  const handleChangestatusTeam1 = async () => {
    //mudar time1
    const updateData = [
      PlacarT1 === PlacarT2
        ? {
            path: "/empates",
            op: "replace",
            value: (T1_empates -= 1),
          }
        : PlacarT1 > PlacarT2
        ? {
            path: "/vitorias",
            op: "replace",
            value: (T1_vitorias -= 1),
          }
        : {
            path: "/derrotas",
            op: "replace",
            value: (T1_derrotas -= 1),
          },

      {
        path: "/golsFeitos",
        op: "replace",
        value: (T1_golsFeitos -= PlacarT1),
      },
      {
        path: "/golsSofridos",
        op: "replace",
        value: (T1_golsSofridos -= PlacarT2),
      },
    ];
    console.log(updateData);
    //finaliza a partida retirando a mesma do calendario e enviado para o resultados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time/${T1_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Partida atualizada com sucesso
        console.log("time1 atualizada com sucesso");
      } else {
        // Erro ao atualizar partida
        alert("Erro ao atualizar time1");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  const handleChangestatusTeam2 = async () => {
    //mudar time1
    const updateData = [
      PlacarT1 === PlacarT2
        ? {
            path: "/empates",
            op: "replace",
            value: (T2_empates -= 1),
          }
        : PlacarT2 > PlacarT1
        ? {
            path: "/vitorias",
            op: "replace",
            value: (T2_vitorias -= 1),
          }
        : {
            path: "/derrotas",
            op: "replace",
            value: (T2_derrotas -= 1),
          },

      {
        path: "/golsFeitos",
        op: "replace",
        value: (T2_golsFeitos -= PlacarT2),
      },
      {
        path: "/golsSofridos",
        op: "replace",
        value: (T2_golsSofridos -= PlacarT1),
      },
    ];
    console.log(updateData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time/${T2_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Partida atualizada com sucesso
        console.log("time2 atualizada com sucesso");
      } else {
        // Erro ao atualizar partida
        alert("Erro ao atualizar time2");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const { SetAtualizarPartidas, AtualizarPartidas, usuarioSecao } =
    UseBagresContext();

  const RetornarPartidaFinalizada = async () => {
    //PATCH para mudar o status da partida para não finalizada
    const updateData = [
      {
        path: "/partidaFinalizada",
        op: "replace",
        value: false,
      },
      {
        path: "/time1Placar",
        op: "replace",
        value: 0,
      },
      {
        path: "/time2Placar",
        op: "replace",
        value: 0,
      },
    ];
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}partida/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        // Partida atualizada com sucesso
        console.log("Partida atualizada com sucesso");
        //retirando os dados da partida dos times
        handleChangestatusTeam1();
        handleChangestatusTeam2();
      } else {
        alert("Erro ao atualizar partida");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
    SetAtualizarPartidas(AtualizarPartidas + 1);
  };

  return (
    <div className="mainPartidaFinalizada">
      <p className="TipoPartidaFinalizada">{tipoConfronto}</p>
      <div className="ContainerInfoPartidaFinalizada">
        <div className="TimesPartidaFinalizada">
          <div className="TimePartidaFinalizada">
            <img src={logoT1} className="ImagemTimePartidaFinalizada" />
            <p className="NomeTimePartidaFinalizada">{nomeT1}</p>
          </div>
          <div className="TimePartidaFinalizada">
            <img src={logoT2} className="ImagemTimePartidaFinalizada" />
            <p className="NomeTimePartidaFinalizada">{nomeT2}</p>
          </div>
        </div>
        <div className="PlacarPartidasFinalizada">
          <p>{PlacarT1}</p>
          <p>{PlacarT2}</p>
        </div>
        <div className="DataPartidaFinalizada">
          <p className="FimPartida">FIM</p>
          <p className="DataPartidaFinalizada">{data}</p>
        </div>
      </div>
      {usuarioSecao?.token === "admin" && ( //Apenas ADM tem Acesso a criar
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <GrReturn
            onClick={() => {
              RetornarPartidaFinalizada();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PartidaFinalizada;
