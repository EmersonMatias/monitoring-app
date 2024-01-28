'use client'
import { useCheckpointContingency, useGetByUserIDContingency } from "@/hooks/hooks-contingency"
import { contingencyTime } from "./functions"

export default function ContingencyVigilant({ userId }: ContingencyVigilantProps) {
    const { data: contingency, isSuccess, isRefetching } = useGetByUserIDContingency(userId)

    const { mutate: checkpointContingency } = useCheckpointContingency()

    const contigencyTime = contingencyTime(contingency)
    const restTime = contigencyTime?.restTime
    const statusOpen = contigencyTime?.statusOpen
    const diff = contigencyTime?.diff

    console.log(diff)



    function handleOK() {
        const checkpointContigencyData = {
            userId,
            status: "OK"
        }

        checkpointContingency(checkpointContigencyData)
    }

    function handleEmergency() {
        const checkpointContigencyData = {
            userId,
            status: "EMERGENCY"
        }

        checkpointContingency(checkpointContigencyData)
    }

    return (
        <main className="flex flex-col items-center">
            {(isSuccess && contingency.contigency) &&
                <div className="flex flex-col items-center">
                    <p className="text-center font-bold mt-5">Contingência está ativa</p>

                    <div className="text-center">
                        <p>Último Status:<span> {contingency.status} </span></p>
                        <p>Horário do último status:<span> {contingency?.hour?.toString().padStart(2, "0")}:{contingency.minute?.toString().padStart(2, "0")}</span></p>

                        {statusOpen && <p className="text-center font-bold">Você ainda não pode fazer sua atualização do status. Faltam {restTime} minutos</p>}
                        {(diff <= 5 && !statusOpen) && <p className="text-center font-bold">Faltam {5 - diff} minutos para você fazer o checkpoint. Se não uma notificação será gerada ao administrador.</p>}
                        {diff > 5 && <p className="text-red-400 font-bold">O seu tempo para fazer o checkpoint se esgotou. Uma notificação foi gerada ao administrador.</p>}

                    </div>
                    <button onClick={handleOK} disabled={statusOpen} className="p-2 mt-5 bg-blue-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50">
                        STATUS OK
                    </button>
                    <button onClick={handleEmergency} className="p-2 mt-5 bg-orange-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50">
                        STATUS EMERGÊNCIA
                    </button>

                </div>
            }
        </main>
    )
}


type ContingencyVigilantProps = {
    readonly userId: number
}