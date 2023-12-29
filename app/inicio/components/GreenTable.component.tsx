'use client'
import { todaysDate } from "@/app/utils/constants"
import { TCheckpoints } from "../page"

export default function GreenTable({search, checkpoints}: {search: string, checkpoints: TCheckpoints[]}) {
    const {day,month,year} = todaysDate()
    const todaysCheckpoint = checkpoints?.filter((checkpoints) => checkpoints.date === `${day}/${month}/${year}`)
    const checkpointsOK = todaysCheckpoint?.filter((checkpoints) => checkpoints.arrived === true)
    const checkpointsFilter = checkpointsOK?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search}`))
    const checkpointView = search.length === 0 ? checkpointsOK : checkpointsFilter
    
    return (
        <div className="max-w-[600px] overflow-x-auto mt-6 flex flex-col items-center bg-[#FFFFFF] p-5 border-[2px] rounded-2xl">

            <div className="bg-[#6FAF79] text-xl  p-2 mb-4 font-bold text-center mx-20 rounded-lg text-white">
                STATUS DE CHEGADA OK
            </div>

            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Horário de Entrada</th>
                        <th className=" px-4 py-2">Horário do Checkpoint</th>
                        <th className=" px-4 py-2">Agência</th>
                        <th className=" px-4 py-2">Status Atual</th>

                    </tr>
                </thead>
                <tbody>

                    {checkpointView?.map((vigilant: TCheckpoints) => (
                        <tr key={vigilant.user.name} className=" text-center">
                            <td className="  px-4 py-2 max-w-[200px] ">{vigilant.user.name}</td>
                            <td className="px-4 py-2 ">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 ">{vigilant.arrivalTime}</td>
                            <td className="px-4 py-2 ">{vigilant.user.agency}</td>
                            <td className="px-4 py-2  justify-center items-center ">
                                <div className="bg-[#76a561] py-2 px-4 rounded-lg font-bold text-white">OK</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

type TGreenTable = {
    vigilantArrived: TCheckpoints[]
}