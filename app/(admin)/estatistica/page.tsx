'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import { currentTime } from '../../utils/constants';
import { useFindManyCheckpoints } from '@/hooks/hooks-checkpoints';
import { convertTimeToBrasilia } from '@/functions/functions';

export default function Estatisticas() {
  const date = new Date().toISOString()
  const { data: checkpoints } = useFindManyCheckpoints({date})
  const { hour, minutes } = currentTime()
  const palette = ['red', 'orange', 'green'];
  const pieParams = { width: 700, height: 300 };
  let chegou = 0;
  let atrasado = 0;
  let aguardando = 0;
  let alert: Checkpoints[] = []

  checkpoints?.map((checkpoint) => {
      if (checkpoint.arrived === true) {
        chegou = chegou + 1
      } else if (checkpoint.arrived === false &&
        (Number(convertTimeToBrasilia(checkpoint?.user?.entryTime).substring(0, 2) ) > hour ||
          (Number(convertTimeToBrasilia(checkpoint?.user?.entryTime).substring(0, 2)) == hour && Number(convertTimeToBrasilia(checkpoint?.user?.entryTime).substring(3, 5)) >= minutes))) {
        aguardando = aguardando + 1
      } else if (checkpoint.arrived === false &&
        (Number(convertTimeToBrasilia(checkpoint?.user?.entryTime).substring(0, 2)) < hour ||
          (Number(convertTimeToBrasilia(checkpoint?.user?.entryTime).substring(0, 2)) == hour && Number(convertTimeToBrasilia(checkpoint?.user?.entryTime).substring(3, 5)) <= minutes))) {
        alert = [...alert, checkpoint]
        atrasado = atrasado + 1
      }
  })

  return (
    <div className='pb-20' >
      <main className='flex px-20 gap-10'>

        <div className='mt-10 bg-[#FFFFFF] w-fit h-fit p-5 border-[2px] rounded-2xl'>
          <h2 className='text-3xl text-center mb-10 font-bold text-[#0B0B0B]'>Estatísticas do Dia</h2>
          <PieChart
            colors={palette}
            series={[{ data: [{ value: atrasado, label: "ATRASADO" }, { value: aguardando, label: "AGUARDANDO CHEGADA" }, { value: chegou, label: "CHEGOU" }], arcLabel: "value", color: "#FFFFFF", }]}
            {...pieParams}
          />
        </div>

        <div className='mt-10 bg-white w-full p-5 border-[2px] rounded-2xl' >

          <h2 className='text-3xl text-center mb-10 font-bold'>Status Alerta</h2>

          <section className='flex gap-5 flex-col'>
            {
              alert.map((conteudo) => (
                <div className='text-center mt-4 p-4 bg-[#ECECEC] rounded-md' key={conteudo?.user?.name}>
                  <p className='font-bold'>{conteudo.agency.name}</p>
                  <span>{conteudo?.user?.name} </span> <span className='text-red-500 font-bold'> ATRASADO</span>
                </div>
              ))
            }

          </section>

        </div>
      </main>
    </div>


  );
}