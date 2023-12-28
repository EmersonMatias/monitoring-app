import axios, { AxiosResponse } from "axios"
import { TCheckpoints } from "../page"

export default async function OrangeTable() {
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const checkpoints: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)
    const todaysCheckpoint = checkpoints.data.filter((checkpoints) => checkpoints.date === "28/12/2023")
    const checkpointsWaiting = todaysCheckpoint.filter((checkpoints) =>
        checkpoints.arrived === false &&
        (Number(checkpoints.user.entryTime.substring(0, 2)) > hour ||
        (Number(checkpoints.user.entryTime.substring(0, 2)) == hour && Number(checkpoints.user.entryTime.substring(3, 5)) >= minutes))
    )
    console.log(hour, minutes)
    console.log(todaysCheckpoint)
    console.log(checkpointsWaiting)
   
    return (
        <div className="max-w-[600px] overflow-x-auto  mt-6  flex flex-col items-center bg-[#4a4845] p-5">
            <div className="bg-[#FFB649] text-xl p-2 font-bold text-center max-w-[300px] mb-4 mx-20 rounded-lg">
                STATUS DE CHEGADA AGUARDANDO
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
                    {checkpointsWaiting.map((vigilant: TCheckpoints) => (
                        <tr key={vigilant.user.name} className="rounded-2xl bg-slate-600 border-t-[16px] border-[#4a4845] text-center">
                            <td className="  px-4 py-2 max-w-[200px] ">{vigilant.user.name}</td>
                            <td className="px-4 py-2 ">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 ">{vigilant.user.agency}</td>
                            <td className="px-4 py-2  justify-center items-center ">
                                <div className="bg-[#FFB649] py-2 px-4 rounded-lg font-bold">Aguardando</div>
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