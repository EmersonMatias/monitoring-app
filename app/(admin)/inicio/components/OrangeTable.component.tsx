'use client'
import { useCreateAllCheckpoints, useGetAllTodayCheckpoint } from "@/hooks/hooks-checkpoints"
import { checkpointsOrange } from "../functions"

export default function OrangeTable({ search }: { readonly search: string }) {
    const {mutate: createAllCheckpoints} = useCreateAllCheckpoints()

    const { data: checkpoints, isSuccess, isRefetching } = useGetAllTodayCheckpoint(createAllCheckpoints)

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
                    {isSuccess && checkpointsOrange(checkpoints, search, isSuccess)?.map((vigilant: TCheckpoints) => (
                        <tr key={vigilant.user.name} className="text-center">
                            <td className="  px-4 py-2 max-w-[200px] text-sm ">{vigilant.user.name}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.agency.name}</td>
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
