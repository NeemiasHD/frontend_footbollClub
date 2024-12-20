import { PartidaType, UseBagresContext } from "@/app/Context/BagresContext";
import React from "react";
import { GrReturn } from "react-icons/gr";

interface ResultadoPartidaProps {
  Partida: PartidaType;
  //dados para voltar a partida para não finalizada:
}

const PartidaFinalizada: React.FC<ResultadoPartidaProps> = ({ Partida }) => {
  const handleChangestatusTeam1 = async () => {
    //mudar time1
    const updateData = [
      Partida.time1Placar === Partida.time2Placar
        ? {
            path: "/empates",
            op: "replace",
            value: (Partida.time1.empates -= 1),
          }
        : Partida.time1Placar > Partida.time2Placar
        ? {
            path: "/vitorias",
            op: "replace",
            value: (Partida.time1.vitorias -= 1),
          }
        : {
            path: "/derrotas",
            op: "replace",
            value: (Partida.time1.derrotas -= 1),
          },

      {
        path: "/golsFeitos",
        op: "replace",
        value: (Partida.time1.golsFeitos -= Partida.time1Placar),
      },
      {
        path: "/golsSofridos",
        op: "replace",
        value: (Partida.time1.golsSofridos -= Partida.time2Placar),
      },
    ];
    console.log(updateData);
    //finaliza a partida retirando a mesma do calendario e enviado para o resultados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time/${Partida.time1.timeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
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
    //mudar time2
    const updateData = [
      Partida.time1Placar === Partida.time2Placar
        ? {
            path: "/empates",
            op: "replace",
            value: (Partida.time2.empates -= 1),
          }
        : Partida.time1Placar > Partida.time2Placar
        ? {
            path: "/vitorias",
            op: "replace",
            value: (Partida.time2.vitorias -= 1),
          }
        : {
            path: "/derrotas",
            op: "replace",
            value: (Partida.time2.derrotas -= 1),
          },

      {
        path: "/golsFeitos",
        op: "replace",
        value: (Partida.time2.golsFeitos -= Partida.time2Placar),
      },
      {
        path: "/golsSofridos",
        op: "replace",
        value: (Partida.time2.golsSofridos -= Partida.time1Placar),
      },
    ];
    console.log(updateData);
    //finaliza a partida retirando a mesma do calendario e enviado para o resultados

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}time/${Partida.time2.timeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
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
        `${process.env.NEXT_PUBLIC_API_BAGRES}partida/${Partida.partidaId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuarioSecao?.token}`,
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
      <p className="TipoPartidaFinalizada">{Partida.tipo}</p>
      <div
        className="ContainerInfoPartidaFinalizada"
        onClick={() => {
          Partida.urlFotoFimPartida &&
            window.open(Partida.urlFotoFimPartida, "_blank");
        }}
      >
        <div className="TimesPartidaFinalizada">
          <div className="TimePartidaFinalizada">
            <img
              src={Partida.time1.escudo}
              className="ImagemTimePartidaFinalizada"
            />
            <p className="NomeTimePartidaFinalizada">{Partida.time1.nome}</p>
          </div>
          <div className="TimePartidaFinalizada">
            <img
              src={Partida.time2.escudo}
              className="ImagemTimePartidaFinalizada"
            />
            <p className="NomeTimePartidaFinalizada">{Partida.time2.nome}</p>
          </div>
        </div>
        <div className="PlacarPartidasFinalizada">
          <p>{Partida.time1Placar}</p>
          <p>{Partida.time2Placar}</p>
        </div>
        <div className="DataPartidaFinalizada">
          <p className="FimPartida">FIM</p>
          <p className="DataPartidaFinalizada">{Partida.data}</p>
        </div>
      </div>
      {usuarioSecao?.user.role == "admin" && (
        <div
          style={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
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
