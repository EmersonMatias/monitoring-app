'use client'
import ErrorMessage from "@/components/ErrorMessage"
import SucessMessage from "@/components/SucessMessage"
import { settingsIcon } from "./constants"
import { useDeleteVigilant, useFindManyVigilants } from "@/hooks/hooks-vigilants"
import { useRouter } from "next/navigation"
import { handleDeleteVigilant } from "./functions"
import { convertTimeToBrasilia } from "@/functions/functions"

export default function SettingsTable() {
    const { data: vigilants, isSuccess } = useFindManyVigilants()
    const { mutate: deleteVigilant, isSuccess: vigilantDeleted, isError, reset } = useDeleteVigilant()
    const router = useRouter()

    console.log(vigilants)

    if (vigilantDeleted || isError) {
        setTimeout(() => {

            reset()
        }, 5000)
    }

    return (
        <>
            <table className="w-[80%] table-auto mt-10">

                <thead>
                    <tr>
                        <th className="py-5 bg-white">Nome do Vigilante</th>
                        <th className="py-5 bg-white">Horário de Entrada</th>
                        <th className="py-5 bg-white">Horário de Saída</th>
                        <th className="py-5 bg-white">Agência</th>
                        <th className="py-5 bg-white">Status Contingência</th>
                        <th className="py-5 bg-white"></th>
                        <th className="py-5 bg-white"></th>
                        <th className="py-5 bg-white"></th>
                        <th className="py-5 bg-white"></th>
                    </tr>
                </thead>

                <tbody>{isSuccess &&
                    vigilants?.map((vigilant) => (
                        <tr key={vigilant.id} className=" text-center">
                            <td className=" px-5 py-5 max-w-[200px] border-y-slate-300 border-y-2">{vigilant.name}</td>
                            <td className="px-5 py-5  border-y-slate-300 border-y-2">{convertTimeToBrasilia(vigilant.entryTime) }</td>
                            <td className="px-5 py-5  border-y-slate-300 border-y-2">{convertTimeToBrasilia(vigilant.departureTime)}</td>
                            <td className="px-5 py-5  border-y-slate-300 border-y-2">{vigilant.agency.name}</td>

                            <td className="px-2 py-5 border-y-slate-300 border-y-2">
                                <div className="flex justify-center">
                                    {vigilant.contigency.active === true ?
                                        <p
                                            className="bg-green-400 py-2 px-4 w-fit rounded-md text-white font-bold"
                                            title="Contingência">
                                            ON
                                        </p> : <p
                                            className="bg-red-500 py-2 px-4 w-fit rounded-md text-white font-bold"
                                            title="Contingência">
                                            OFF
                                        </p>
                                    }
                                </div>
                            </td>

                            <td className=" border-y-slate-300 border-y-2 px-5 py-5" >
                                <button
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => handleDeleteVigilant(vigilant.id, deleteVigilant)}
                                    title="Deletar Usuário">
                                    {settingsIcon.deleteIcon}
                                    <p className="text-xs mt-2">Excluir Vigilante</p>
                                </button>
                            </td>

                            <td className="border-y-slate-300 border-y-2 px-2 py-5">
                                <button
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => router.push(`checkpoint/${vigilant.id}`)}
                                    title="Criar Checkpoint">
                                    {settingsIcon.createCheckpointIcon}
                                    <p className="text-xs mt-2">Criar Checkpoint</p>
                                </button>
                            </td>

                            <td className="border-y-slate-300 border-y-2 px-2 py-5">
                                <button
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => { router.push(`vigilante/${vigilant.id}`) }}
                                    title="Criar Checkpoint">
                                    {settingsIcon.editIcon}
                                    <p className="text-xs mt-2">Editar Vigilante</p>
                                </button>
                            </td>

                            <td className="px-2 py-5 border-y-slate-300 border-y-2 cursor-pointer">
                                <button
                                    className="bg-orange-400 py-2 px-4 rounded-md text-white font-bold"
                                    onClick={() => router.push(`contingencia/${vigilant.id}`)}
                                    title="Contingência">
                                    Contingência
                                </button>
                            </td>
                        </tr>
                    ))
                }</tbody>

            </table>

            <SucessMessage hidden={!vigilantDeleted}>Vigilante deletado com sucesso.</SucessMessage>
            <ErrorMessage hidden={!isError}>Vigilante não deletado. Problemas no servidor!</ErrorMessage>
        </>
    )
}