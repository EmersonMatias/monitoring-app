'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import { currentTime, dateTime } from '../../utils/constants';
import { useGetAllCheckpoints } from '@/hooks/hooks-checkpoints';


export default function Estatisticas() {
  const { data: checkpoints } = useGetAllCheckpoints()
  const { hour, minutes } = currentTime()
  const { day, month, year } = dateTime()
  const palette = ['red', 'orange', 'green'];
  const pieParams = { width: 700, height: 300 };
  let chegou = 0;
  let atrasado = 0;
  let aguardando = 0;
  let alert: TCheckpoints[] = []
  const currentDate = `${day}/${month}/${year}`

  checkpoints?.map((checkpoint) => {
    const checkpointDate = `${checkpoint.day.toString().padStart(2, "0")}/${checkpoint.month.toString().padStart(2, "0")}/${checkpoint.year.toString().padStart(2, "0")}`
    console.log(checkpointDate, currentDate)
    if (checkpointDate === currentDate && checkpoint.user.agency !== "admin") {
      if (checkpoint.arrived === true) {
        chegou = chegou + 1
      } else if (checkpoint.arrived === false &&
        (Number(checkpoint.user.entryTime.substring(0, 2)) > hour ||
          (Number(checkpoint.user.entryTime.substring(0, 2)) == hour && Number(checkpoint.user.entryTime.substring(3, 5)) >= minutes))) {
        aguardando = aguardando + 1
      } else if (checkpoint.arrived === false &&
        (Number(checkpoint.user.entryTime.substring(0, 2)) < hour ||
          (Number(checkpoint.user.entryTime.substring(0, 2)) == hour && Number(checkpoint.user.entryTime.substring(3, 5)) <= minutes))) {
        alert = [...alert, checkpoint]
        atrasado = atrasado + 1
      }
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
                <div className='text-center mt-4 p-4 bg-[#ECECEC] rounded-md' key={conteudo.user.name}>
                  <p className='font-bold'>{conteudo.user.agency}</p>
                  <span>{conteudo.user.name} </span> <span className='text-red-500 font-bold'> ATRASADO</span>
                </div>
              ))
            }

          </section>

        </div>
      </main>
    </div>


  );
}