'use client'
import { useDeleteVigilant, useGetAllVigilants } from "@/hooks/hooks-vigilants"
import { useRouter } from "next/navigation"

export default function Configuraçoes() {
    const { data: vigilants } = useGetAllVigilants()
    const { mutate: deleteVigilant } = useDeleteVigilant()
    const router = useRouter()

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

            <table className="w-1/2 table-auto mt-10">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Horário de Entrada</th>
                        <th className=" px-4 py-2">Horário de Saída</th>
                        <th className=" px-4 py-2">Agência</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        vigilants?.map((vigilant) => (
                            <tr key={vigilant.id} className=" text-center">
                                <td onClick={() => {
                                    router.push(`configuracoes/${vigilant.id}`)
                                }} className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2 cursor-pointer">{vigilant.name}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{vigilant.entryTime}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{vigilant.departureTime}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{vigilant.agency}</td>
                                <td className=" border-y-slate-300 border-y-2 cursor-pointer" onClick={() => handleDeleteVigilant(vigilant.id)}>
                                    <svg className="w-[24px] h-[24px]" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </td>
                                <td className="border-y-slate-300 border-y-2 pl-4 cursor-pointer" onClick={() => router.push(`checkpoint/${vigilant.id}`)}>
                                    <svg  className="w-[24px] h-[24px]" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                                    </svg>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </main>
    )
}



