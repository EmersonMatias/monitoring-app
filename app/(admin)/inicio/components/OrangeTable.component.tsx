'use client'
import { TCheckpoints } from "../page"
import { useRouter } from "next/navigation"
import { currentTime, todaysDate } from "@/app/utils/constants"

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

export default function OrangeTable({search, checkpoints}: {search: string, checkpoints: TCheckpoints[]}) {
    const router = useRouter()
    const {day,month,year} = todaysDate()
    const { hour, minutes } = currentTime()
    const todaysCheckpoint = checkpoints?.filter((checkpoints) => checkpoints.date === `${day}/${month}/${year}`)
    const checkpointsWaiting = todaysCheckpoint?.filter((checkpoints) =>
        checkpoints.arrived === false &&
        (Number(checkpoints.user.entryTime.substring(0, 2)) > hour ||
        (Number(checkpoints.user.entryTime.substring(0, 2)) == hour && Number(checkpoints.user.entryTime.substring(3, 5)) >= minutes))
    )
    const checkpointsFilter = checkpointsWaiting?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search}`))
    const checkpointView = search.length === 0 ? checkpointsWaiting : checkpointsFilter

    return (
        <div className="max-w-[600px] overflow-x-auto  mt-6  flex flex-col items-center bg-[#FFFFFF] p-5  border-[2px] rounded-2xl">
            <div className="bg-[#FFB649] text-base p-1 font-bold text-center mb-4  rounded-lg text-white">
                STATUS DE CHEGADA AGUARDANDO
            </div>

            <table className="w-full table-auto ">

                <thead>
                    <tr>
                        <th className=" px-4 py-2 text-sm">Nome do Vigilante</th>
                        <th className=" px-4 py-2 text-sm">Horário de Entrada</th>
                        <th className=" px-4 py-2 text-sm">Agência</th>
                        <th className=" px-4 py-2 text-sm">Status Atual</th>

                    </tr>
                </thead>

                <tbody>
                    {checkpointView?.map((vigilant: TCheckpoints) => (
                        <tr key={vigilant.user.name} className="text-center">
                            <td className="  px-4 py-2 max-w-[200px]text-sm ">{vigilant.user.name}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.agency}</td>
                            <td className="px-4 py-2  justify-center items-center text-sm">
                                <div className="bg-[#FFB649] py-1 px-2 rounded-lg font-bold text-white">Aguardando</div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

type TOrangeTable = {
    vigilantWaiting: TCheckpoints[]
}