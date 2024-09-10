"use client";
import { getCookie, getCookies, setCookie } from "cookies-next";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface ContextoBagresProps {
  children: ReactNode;
}

interface BagresContextType {
  atualizarNoticias: number;
  setAtualizarNoticias: React.Dispatch<React.SetStateAction<number>>;
  ImagemUpload: File | null;
  SetImagemUpload: React.Dispatch<React.SetStateAction<File | null>>;
  Times: time[];
  SetTimes: React.Dispatch<React.SetStateAction<time[]>>;
  AtualizarTimes: number;
  SetAtualizarTimes: React.Dispatch<React.SetStateAction<number>>;
  Partidas: Partidas[];
  SetPartidas: React.Dispatch<React.SetStateAction<Partidas[]>>;
  AtualizarPartidas: number;
  SetAtualizarPartidas: React.Dispatch<React.SetStateAction<number>>;
  jogadores: jogador[];
  setjogadores: React.Dispatch<React.SetStateAction<jogador[]>>;
  Atualizarjogadores: number;
  SetAtualizarJogadores: React.Dispatch<React.SetStateAction<number>>;
  bagreouroatual: number;
  setBagreOuroAtual: React.Dispatch<React.SetStateAction<number>>;
  usuarioSecao: usuarioMaisToken | null;
  setUsuarioSecao: React.Dispatch<
    React.SetStateAction<usuarioMaisToken | null>
  >;
  fotos: foto[];
  setFotos: React.Dispatch<React.SetStateAction<foto[]>>;
  setAtualizarFotos: React.Dispatch<React.SetStateAction<number>>;
  AtualizarFotos: number;
}
type jogador = {
  jogadorId: number;
  nome: string;
  foto: string;
  posicao: string;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  gols: number;
  assistencias: number;
  bagreDaPartida: number;
  numCamisa: number;
};
type time = {
  timeId: number;
  nome: string;
  escudo: string;
  vitorias: number;
  derrotas: number;
  empates: number;
  golsFeitos: number;
  golsSofridos: number;
};
type usuarioMaisToken = {
  user: user;
  token: string;
};
type user = {
  role: string;
  usuarioId: number;
  nome: string;
  email: string;
  foto: string;
  senha: string;
};
type foto = {
  id: number;
  fotoUrl: string;
  data: string;
  descricao: string;
};

type Partidas = {
  partidaId: number;
  tipo: string;
  local: string;
  horario: string;
  partidaFinalizada: boolean;
  data: string;
  time1_id: number;
  time2_id: number;
  time1Placar: number;
  time2Placar: number;
  time1: time;
  time2: time;
};

const BagresContext = createContext<BagresContextType | undefined>(undefined);
export function ProvedorBagres({ children }: ContextoBagresProps) {
  //importando cookies

  const [atualizarNoticias, setAtualizarNoticias] = useState(0);
  const [ImagemUpload, SetImagemUpload] = useState<File | null>(null);
  const [Times, SetTimes] = useState<time[]>([]);
  const [AtualizarTimes, SetAtualizarTimes] = useState(0);
  const [Partidas, SetPartidas] = useState<Partidas[]>([]);
  const [AtualizarPartidas, SetAtualizarPartidas] = useState(0);

  const [jogadores, setjogadores] = useState<jogador[]>([]);
  const [Atualizarjogadores, SetAtualizarJogadores] = useState(0);
  const [bagreouroatual, setBagreOuroAtual] = useState(0);
  const [usuarioSecao, setUsuarioSecao] = useState<usuarioMaisToken | null>(
    null
  ); //usuario logado na secao
  const [fotos, setFotos] = useState<foto[]>([]); //usuario logado na secao
  const [AtualizarFotos, setAtualizarFotos] = useState(0);

  const getItens = async (
    path: string,
    setfetch: React.Dispatch<React.SetStateAction<any>>
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BAGRES}${path}`
      );
      const data = await response.json();
      setfetch(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    getItens("jogador", setjogadores);
  }, [Atualizarjogadores]);

  useEffect(() => {
    //buscar times
    getItens("time", SetTimes);
  }, [AtualizarTimes]);

  useEffect(() => {
    //buscar as partidas

    getItens("partida", SetPartidas);
  }, [AtualizarPartidas]);
  useEffect(() => {
    //buscar as partidas

    getItens("foto", setFotos);
  }, [AtualizarFotos]);
  useEffect(() => {
    const fetchBagreAtual = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BAGRES}BagreDeOuroAtual`
        );
        const data = await response.json();
        setBagreOuroAtual(data[data.length - 1].bagreid);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchBagreAtual();
  }, []);

  //COOKIES DE LOGIN DO USUARIO
  useEffect(() => {
    const setUsuarioSalvoNoCookie = () => {
      const UserCookie = getCookie("Usuario");
      if (UserCookie) {
        const teste = JSON.parse(UserCookie);
        setUsuarioSecao(teste);
      }
    };
    setUsuarioSalvoNoCookie();
  }, []);
  return (
    <BagresContext.Provider
      value={{
        atualizarNoticias,
        setAtualizarNoticias,
        ImagemUpload,
        SetImagemUpload,
        Times,
        SetTimes,
        AtualizarTimes,
        SetAtualizarTimes,
        jogadores,
        setjogadores,
        Atualizarjogadores,
        SetAtualizarJogadores,
        bagreouroatual,
        setBagreOuroAtual,
        Partidas,
        SetPartidas,
        AtualizarPartidas,
        SetAtualizarPartidas,
        usuarioSecao, //usuario da seção atual do navegador
        setUsuarioSecao,
        fotos, //fotos da seção fotos
        setFotos,
        AtualizarFotos,
        setAtualizarFotos,
      }}
    >
      {children}
    </BagresContext.Provider>
  );
}

export function UseBagresContext() {
  const context = useContext(BagresContext);
  if (!context) {
    throw new Error("UseBagresContext must be used within a ProvedorBagres");
  }
  return context;
}

export async function UploadImagemToClound(Imagem: File) {
  const formData = new FormData();
  if (Imagem) {
    formData.append(`file`, Imagem);
  }
  formData.append(`upload_preset`, `bagres-uploads`);

  const data = await fetch(
    "https://api.cloudinary.com/v1_1/dtpsqmz73/image/upload",
    {
      method: "POST",

      body: formData,
    }
  );
  const r = await data.json();
  return r.secure_url;
}

export async function RenderLogo(logo: string) {
  //renderiza logos de url para local assim permitindo o canvas trabalhar
  try {
    const response = await fetch(logo);
    if (!response.ok) {
      throw new Error("Erro ao carregar imagem");
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Erro ao baixar a imagem:", error);
    return;
  }
}

export async function HandleFetchDelete( //deleta qualquer componente do backend
  path: string,
  id: number,
  setAtualizarComponentes: React.Dispatch<React.SetStateAction<number>>,
  AtualizarComponentes: number,
  token: string
) {
  //excluir uma partida
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BAGRES}${path}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    setAtualizarComponentes(AtualizarComponentes + 1);
  } else {
    alert(`Erro ao deletar ${path}`);
  }
}
