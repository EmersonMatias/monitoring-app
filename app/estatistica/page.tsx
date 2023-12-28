'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import Header from '../inicio/components/Header.component';
import { useEffect, useState } from 'react';
import { TCheckpoints } from '../inicio/page';
import axios, { AxiosResponse } from 'axios';

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
  const date = new Date()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const palette = ['red', 'orange', 'green'];
  const pieParams = { width: 900, height: 300, margin: { right: 5 } };
  let chegou = 0;
  let atrasado = 0;
  let aguardando = 0;
  let alert: TCheckpoints[] = []

  checkpoints.map((checkpoint) => {

    if (checkpoint.date === "28/12/2023") {
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

  const agenciesList = agencies.filter((value, index, self) => self.indexOf(value) === index)
console.log(agenciesList)

  console.log(alert)

  useEffect(() => {
    const getCheckpoints = async () => {
      const checkpoints: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)
      return setCheckpoints(checkpoints.data)
    }

    getCheckpoints()
  }, [])


  return (
    <div >
      <Header />

      <div className='flex flex-col items-center mt-10 '>
        <h2 className='text-3xl text-center mb-10'>Estatísticas</h2>
        <PieChart
          colors={palette}
          series={[{ data: [{ value: atrasado, label: "ATRASADO" }, { value: aguardando, label: "AGUARDANDO CHEGADA" }, { value: chegou, label: "CHEGOU" }], arcLabel: "value", color: "#FFFFFF", }]}
          {...pieParams}

        />
      </div>

      <div className='mt-10' >
        <h2 className='text-3xl text-center mb-10'>Status Alerta</h2>
        <section className='flex gap-5 px-20'>

          {agenciesList?.map((agency) => (
            <div className=' p-4 bg-[#4a4845] rounded-md' key={agency}>
              <h3 className='text-center'>{agency}</h3>
              {alert.map((alert) => (
                agency === alert.user.agency && 
                <div className='text-center mt-4' key={alert.user.name}>
                  <span>{alert.user.name} </span> <span className='text-red-500 font-bold'> ATRASADO</span>
                </div>
              ))}

            </div>
          ))}




        </section>

      </div>

    </div>


  );
}