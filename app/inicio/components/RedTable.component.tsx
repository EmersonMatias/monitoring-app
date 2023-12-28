'use client'
import axios, { AxiosResponse } from "axios"
import { TCheckpoints } from "../page"
import { useEffect, useState } from "react"

const initialData:TCheckpoints[] = [
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

export default function RedTable({search}: {search: string}) {
    const [checkpoints, setCheckpoints] = useState<TCheckpoints[]>(initialData)
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const todaysCheckpoint = checkpoints.filter((checkpoints) => checkpoints.date === "28/12/2023")
    const checkpointsAlert = todaysCheckpoint.filter((checkpoints) =>
        checkpoints.arrived === false &&
        (Number(checkpoints.user.entryTime.substring(0, 2)) < hour ||
        (Number(checkpoints.user.entryTime.substring(0, 2)) == hour && Number(checkpoints.user.entryTime.substring(3, 5)) <= minutes))
    )
    const checkpointsFilter = checkpointsAlert?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search}`))
    const checkpointView = search.length === 0 ? checkpointsAlert : checkpointsFilter

    useEffect(() => {
        const getCheckpoints = async () => {
            const checkpoints: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)
            return setCheckpoints(checkpoints.data)
        }
        const intervalId = setInterval(() => {
           getCheckpoints()
      
        }, 5000)
        return () => clearInterval(intervalId);

    }, [])
  

    return (
     
        <div className="max-w-[600px] overflow-x-auto  mt-6  flex flex-col items-center bg-[#4a4845] p-5">
        <div className="bg-[#FC6F6F] text-xl p-2 mb-4 font-bold text-center max-w-[300px] mx-20 rounded-lg">
            STATUS DE CHEGADA ALERTA
        </div>

        <table className="w-full table-auto ">
            <thead>
                <tr>
                    <th className=" px-4 py-2">Nome do Vigilante</th>
                    <th className=" px-4 py-2">Horário de Entrada</th>
                    <th className=" px-4 py-2">Agência</th>
                    <th className=" px-4 py-2">Status Atual</th>

                </tr>
            </thead>
            <tbody>
            {checkpointView.map((vigilant: TCheckpoints) => (
                           <tr key={vigilant.user.name} className="rounded-2xl bg-slate-600 border-t-[16px] border-[#4a4845] text-center">
                           <td className="  px-4 py-2 max-w-[200px] ">{vigilant.user.name}</td>
                           <td className="px-4 py-2 ">{vigilant.user.entryTime}</td>
                           <td className="px-4 py-2 ">{vigilant.user.agency}</td>
                           <td className="px-4 py-2  justify-center items-center ">
                               <div className="bg-[#FC6F6F] py-2 px-4 rounded-lg font-bold">Alerta</div>
                           </td>
                       </tr>
                    ))}

          

            </tbody>
        </table>

    </div>
    )
}

type TRedTable = {
    vigilantAlert: TCheckpoints[]
}