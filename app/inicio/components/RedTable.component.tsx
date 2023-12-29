'use client'
import { currentTime, todaysDate } from "@/app/utils/constants"
import { TCheckpoints } from "../page"

export default function RedTable({ search, checkpoints }: { search: string, checkpoints: TCheckpoints[] }) {
    const { day, month, year } = todaysDate()
    const { hour, minutes } = currentTime()
    const todaysCheckpoint = checkpoints.filter((checkpoints) => checkpoints.date === `${day}/${month}/${year}`)
    const checkpointsAlert = todaysCheckpoint.filter((checkpoints) =>
        checkpoints.arrived === false &&
        (Number(checkpoints.user.entryTime.substring(0, 2)) < hour ||
            (Number(checkpoints.user.entryTime.substring(0, 2)) == hour && Number(checkpoints.user.entryTime.substring(3, 5)) <= minutes))
    )
    const checkpointsFilter = checkpointsAlert?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search}`))
    const checkpointView = search.length === 0 ? checkpointsAlert : checkpointsFilter

    return (

        <div className="max-w-[600px] overflow-x-auto  mt-6  flex flex-col items-center bg-[#FFFFFF] p-5  border-[2px] rounded-2xl">
            <div className="bg-[#FC6F6F] text-xl p-2 mb-4 font-bold text-center rounded-lg text-white">
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
                        <tr key={vigilant.user.name} className={`rounded-2xl text-center ${vigilant.user.agency === "admin" && "hidden"}`}>
                            <td className="  px-4 py-2 max-w-[200px] ">{vigilant.user.name}</td>
                            <td className="px-4 py-2 ">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 ">{vigilant.user.agency}</td>
                            <td className="px-4 py-2  justify-center items-center ">
                                <div className="bg-[#FC6F6F] text-white py-2 px-4 rounded-lg font-bold">Alerta</div>
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