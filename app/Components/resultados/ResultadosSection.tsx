'use client';
import React from 'react';
import HeaderSection from '../headerSection/HeaderSection';
import { BarChart, PieChart } from '@mui/x-charts';
import { UseBagresContext } from '@/app/Context/BagresContext';
import PartidaFinalizada from './PartidaFinalizada';
import Cardplayer from '../cardPlayer/Cardplayer';
function ResultadosSection() {
  const { Partidas, Times, jogadores } = UseBagresContext();
  const formatData = (data: string) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className='ResultadosSectionMain' style={{ backgroundColor: 'white' }}>
      <HeaderSection NomeSecao={'Resultados'} />
      <div className='ContainerPartidasEstatisticas'>
        <div className='PartidasFinalizadas'>
          {Partidas.map((p) =>
            p.partidaFinalizada === true ? (
              <PartidaFinalizada key={p.partidaId} Partida={p} />
            ) : null
          )}
        </div>
        <div className='Estatisticas'>
          {Times[1] && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 1,
                        value: Times[0].vitorias,
                        label: 'Vitórias',
                        color: '#62ff00',
                      },
                      {
                        id: 2,
                        value: Times[0].derrotas,
                        label: 'Derrotas',
                        color: 'red',
                      },
                      {
                        id: 0,
                        value: Times[0].empates,
                        label: 'Empates',
                        color: '#c2c2c2',
                      },
                    ],
                  },
                ]}
                width={450}
                height={300}
                className='grafico'
              />
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: ['Gols feitos / Gols sofrido / Partidas Jogadas'],
                  },
                ]}
                series={[
                  {
                    data: [Times[0].golsFeitos],
                    color: 'var(--corazul)',
                  },
                  {
                    data: [Times[0].golsSofridos],
                    color: 'red',
                  },
                  {
                    data: [
                      Times[0].derrotas + Times[0].empates + Times[0].vitorias,
                    ],
                    color: '#c2c2c2',
                  },
                ]}
                width={450}
                height={300}
                className='grafico'
              />
            </div>
          )}
        </div>
      </div>
      <div
        className='Statusjogadores'
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '70px',
        }}
      >
        <div
          style={{
            maxWidth: '250px',
            width: '100%',
            gap: '1px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p>Artilharia</p>
          <div
            style={{
              borderRadius: '10px',
            }}
          >
            <div style={{ transform: 'scale(0.9)' }}>
              <Cardplayer
                isBagredeOuro={1}
                jogador={jogadores.reduce(
                  (prev, current) =>
                    current.gols > prev.gols ? current : prev,
                  jogadores[0]
                )}
              />
            </div>

            {jogadores
              .sort((a, b) => b.gols - a.gols)
              .slice(0, 5) // Ordena em ordem decrescente de gols
              .map((jogador) => (
                <div
                  key={jogador.jogadorId}
                  className='jogadoresList'
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    display: 'flex',
                    padding: '10px',
                  }}
                >
                  <p>{jogador.nome}</p>
                  <p>Gols: {jogador.gols}</p>
                </div>
              ))}
          </div>
        </div>
        <div
          style={{
            maxWidth: '250px',
            width: '100%',
            gap: '1px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p>Assist</p>
          <div
            style={{
              borderRadius: '10px',
            }}
          >
            <div style={{ transform: 'scale(0.9)' }}>
              <Cardplayer
                isBagredeOuro={1}
                jogador={jogadores.reduce(
                  (prev, current) =>
                    current.assistencias > prev.assistencias ? current : prev,
                  jogadores[0]
                )}
              />
            </div>

            {jogadores
              .sort((a, b) => b.assistencias - a.assistencias)
              .slice(0, 5) // Ordena em ordem decrescente de gols
              .map((jogador) => (
                <div
                  key={jogador.jogadorId}
                  className='jogadoresList'
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    padding: '10px',

                    display: 'flex',
                  }}
                >
                  <p>{jogador.nome}</p>
                  <p>Assist: {jogador.assistencias}</p>
                </div>
              ))}
          </div>
        </div>
        <div style={{ zoom: '.6' }}>
          <BarChart
            xAxis={[
              {
                scaleType: 'band',
                data: jogadores
                  .sort((a, b) => b.gols - a.gols)
                  .slice(0, 10) // Seleciona os 10 jogadores com mais gols
                  .map((jogador) => jogador.nome), // Coloca o nome de cada jogador no eixo X
              },
            ]}
            series={[
              {
                data: jogadores
                  .sort((a, b) => b.gols - a.gols)
                  .slice(0, 10)
                  .map((jogador) => jogador.gols), // Usa o número de gols de cada jogador
                color: 'var(--corazul)',
                label: 'Gols',
              },
            ]}
            width={650}
            height={500}
            className='grafico'
          />
          <BarChart
            xAxis={[
              {
                scaleType: 'band',
                data: jogadores
                  .sort((a, b) => b.assistencias - a.assistencias)
                  .slice(0, 10) // Seleciona os 10 jogadores com mais gols
                  .map((jogador) => jogador.nome), // Coloca o nome de cada jogador no eixo X
              },
            ]}
            series={[
              {
                label: 'Assistências',
                data: jogadores
                  .sort((a, b) => b.gols - a.gols)
                  .slice(0, 10)
                  .map((jogador) => jogador.gols), // Usa o número de gols de cada jogador
                color: 'var(--corazul)',
              },
            ]}
            width={650}
            height={500}
            className='grafico'
          />
        </div>
      </div>
    </div>
  );
}

export default ResultadosSection;
