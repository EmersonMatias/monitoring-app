'use client'
import { convertTimeToBrasilia } from "@/functions/functions"
import { FindManyContingency, useFindManyContingency } from "@/hooks/hooks-contingency"

export default function Contingency() {
    const { data: contingency, isRefetching } = useFindManyContingency()

    function late(contingency: FindManyContingency) {
        const lastCheckpoint = new Date(contingency.timestamp).getTime()
        const currentTime = new Date().getTime()
        const diff = currentTime - lastCheckpoint
        const late = Math.floor(diff / 60000) <= (contingency.frequency + 5)

        if (late) {
            return <div className="bg-[#76a561] py-1 px-2 rounded-lg font-bold text-white">OK</div>
        } else {
            return <div className="bg-[#FC6F6F] text-base p-2 mb-4 font-bold text-center rounded-lg text-white"> ATRASADO </div>
        }
    }

    console.log(contingency)

    return (
        <main className="flex flex-col items-center">
            <table className="w-1/2 table-auto mt-10">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Agência</th>
                        <th className=" px-4 py-2">Último horário de checkpoint</th>
                        <th className=" px-4 py-2">Último Status</th>
                        <th className=" px-4 py-2">Frequência de Checkpoint</th>
                        <th className=" px-4 py-2">Checkpoint em atraso</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        contingency?.map((oneContingency) => (
                            oneContingency.active &&
                            <tr key={oneContingency.id} className=" text-center">
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency?.user?.name}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.user.agency.name}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{convertTimeToBrasilia(oneContingency.timestamp)}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.situation}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.frequency} minutos</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{late(oneContingency)}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </main>
    )
}