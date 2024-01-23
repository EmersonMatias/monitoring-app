'use client'
import { useDeleteVigilant, useGetAllVigilants } from "@/hooks/hooks-vigilants"
import { useRouter } from "next/navigation"
import { settingsIcon } from "./constants"

export default function Configuraçoes() {
    const { data: vigilants } = useGetAllVigilants()
    const { mutate: deleteVigilant } = useDeleteVigilant()
    const router = useRouter()

    console.log(vigilants)

    async function handleDeleteVigilant(id: number) {
        const confirmDelete = confirm("Você tem certeza que deseja excluir esse vigilante?")

        if (confirmDelete) {
            deleteVigilant(id)
        }
    }

    return (
        <main className="flex flex-col items-center py-20">

            <div className="px-20 flex justify-between items-center font-bold">
                <h2 className="text-3xl">Configurações dos Vigilantes</h2>
            </div>

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

                <tbody>{
                    vigilants?.map((vigilant) => (
                        <tr key={vigilant.id} className=" text-center">
                            <td className=" px-5 py-5 max-w-[200px] border-y-slate-300 border-y-2">{vigilant.name}</td>
                            <td className="px-5 py-5  border-y-slate-300 border-y-2">{vigilant.entryTime}</td>
                            <td className="px-5 py-5  border-y-slate-300 border-y-2">{vigilant.departureTime}</td>
                            <td className="px-5 py-5  border-y-slate-300 border-y-2">{vigilant.agency}</td>

                            <td className="px-2 py-5 border-y-slate-300 border-y-2">
                                <div className="flex justify-center">
                                    {vigilant.contigency.contigency === true ?
                                        <p
                                            className="bg-green-400 py-2 px-4 w-fit rounded-md text-white font-bold"
                                            title="Contingência">
                                            ON
                                        </p> : <p
                                            className="bg-red-500 py-2 px-4 w-fit rounded-md text-white font-bold"
                                            title="Contingência">
                                            OFF
                                        </p>}
                                </div>
                            </td>

                            <td className=" border-y-slate-300 border-y-2 px-5 py-5" >
                                <button
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => handleDeleteVigilant(vigilant.id)}
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
                                    onClick={() => { router.push(`configuracoes/${vigilant.id}`) }}
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

        </main>
    )
}



