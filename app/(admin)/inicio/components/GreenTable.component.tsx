'use client'
import { useFindManyCheckpoints } from "@/hooks/hooks-checkpoints"
import { checkpointsGreen } from "../functions"
import { convertTimeToBrasilia } from "@/functions/functions"
import { dateTime } from "@/app/utils/constants"

export default function GreenTable({ search }: { readonly search: string }) {
    const today = new Date().toISOString()
    const { data: checkpoints, isSuccess } = useFindManyCheckpoints({ date: today })

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
                    {isSuccess && checkpointsGreen(checkpoints, search)?.map((checkpoint: Checkpoints) => (
                        <tr key={checkpoint?.user?.name} className=" text-center">
                            <td className="px-4 py-2 max-w-[200px] text-sm">{checkpoint?.user?.name}</td>
                            <td className="px-4 py-2 text-sm">{convertTimeToBrasilia(checkpoint?.user?.entryTime)}</td>
                            <td className="px-4 py-2 text-sm">{convertTimeToBrasilia(checkpoint.arrivalTime)}</td>
                            <td className="px-4 py-2 text-sm">{checkpoint?.agency.name}</td>
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
