'use client'

import { useGetAllTodayCheckpoint } from "@/hooks/hooks-checkpoints"
import { useEffect, useState } from "react"

export default function GreenTable({ search }: { search: string }) {
    const { data: checkpoints } = useGetAllTodayCheckpoint()
    const checkpointsOK = checkpoints?.filter((checkpoints) => checkpoints.arrived === true)
    const checkpointsFilter = checkpointsOK?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search}`))
    const checkpointView = search.length === 0 ? checkpointsOK : checkpointsFilter
    const [update, setUpdate] = useState(false)

    useEffect(() => {


        const interval = setInterval(() => {
            setUpdate(!update)
        }, 3000);


        return () => clearInterval(interval);

    }, [update])


    return (
        <div className="max-w-[600px] overflow-x-auto mt-6 flex flex-col items-center bg-[#FFFFFF] p-5 border-[2px] rounded-2xl">

            <div className="bg-[#6FAF79] text-base  p-1 mb-4 font-bold text-center mx-20 rounded-lg text-white">
                STATUS DE CHEGADA OK
            </div>

            <table className="w-full table-auto">
                <thead>
                    <tr>
                        <th className=" px-4 py-2 text-sm">Nome do Vigilante</th>
                        <th className=" px-4 py-2 text-sm">Horário de Entrada</th>
                        <th className=" px-4 py-2 text-sm">Horário do Checkpoint</th>
                        <th className=" px-4 py-2 text-sm">Agência</th>
                        <th className=" px-4 py-2 text-sm">Status Atual</th>

                    </tr>
                </thead>
                <tbody>

                    {checkpointView?.map((vigilant: TCheckpoints) => (
                        <tr key={vigilant.user.name} className=" text-center">
                            <td className="px-4 py-2 max-w-[200px] text-sm">{vigilant.user.name}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.arrivalTime}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.agency}</td>
                            <td className="px-4 py-2 text-sm  justify-center items-center ">
                                <div className="bg-[#76a561] py-1 px-2 rounded-lg font-bold text-white">OK</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
