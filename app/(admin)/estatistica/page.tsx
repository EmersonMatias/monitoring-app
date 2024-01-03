'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import Header from '../inicio/components/Header.component';
import { useEffect, useState } from 'react';
import { TCheckpoints } from '../inicio/page';
import axios, { AxiosResponse } from 'axios';
import { currentTime, todaysDate } from '../../utils/constants';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const initialData: TCheckpoints[] = [
  {
    arrived: false,
    arrivalTime: "",
    date: "",
    user: {
      name: "",
      agency: "",
      entryTime: ""
    }
  }
]

export default function Estatisticas() {
  const [checkpoints, setCheckpoints] = useState<TCheckpoints[]>(initialData)
  const { day, month, year } = todaysDate()
  const { hour, minutes } = currentTime()
  const palette = ['red', 'orange', 'green'];
  const pieParams = { width: 700, height: 300 };
  let chegou = 0;
  let atrasado = 0;
  let aguardando = 0;
  let alert: TCheckpoints[] = []
  const router = useRouter()
  const token = Cookies.get("token")

  checkpoints.map((checkpoint) => {

    if (checkpoint.date === `${day}/${month}/${year}` && checkpoint.user.agency !== "admin") {
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

  const agencies = checkpoints.map((checkpoint) => {
    return checkpoint.user.agency
  })

  const agenciesList = agencies?.filter((value, index, self) => self.indexOf(value) === index)

  useEffect(() => {
    const getCheckpoints = async () => {
      const checkpoints: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)
      return setCheckpoints(checkpoints.data)
    }

    if(token === undefined){
      return router.push("/")
    }

    getCheckpoints()

  }, [token, router])

 
  return (
    <div className='pb-20' >

      <main className='flex px-20 gap-10'>

        <div className='mt-10 bg-[#FFFFFF] w-fit h-fit p-5 border-[2px] rounded-2xl '>
          <h2 className='text-4xl text-center mb-10 font-bold text-[#0B0B0B]'>Estatísticas do Dia</h2>
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
              /* {agenciesList?.map((agency) => (
                <div className=' p-4 bg-[#ECECEC] rounded-md' key={agency}>
                  <h3 className='text-center font-semibold text-lg'>{agency}</h3>
                  {alert.map((alert) => (
                    agency === alert.user.agency &&
                    <div className='text-center mt-4' key={alert.user.name}>
                      <span>{alert.user.name} </span> <span className='text-red-500 font-bold'> ATRASADO</span>
                    </div>
                  ))}
  
                </div>
              ))}
             */
            }
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