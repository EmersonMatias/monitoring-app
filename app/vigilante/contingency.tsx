'use client'
import { useCheckpointContingency, useGetByUserIDContingency } from "@/hooks/hooks-contingency"
import { dateTime } from "../utils/constants"

export default function ContingencyVigilant({ userId }: ContingencyVigilantProps) {
    const { data: contingency, isSuccess } = useGetByUserIDContingency(userId)
    const { hour, minute } = dateTime()
    const { mutate: checkpointContingency } = useCheckpointContingency()

    const lastStatus = Number(contingency?.hour) * 60 + Number(contingency?.minute)
    const currentTime = Number(hour) * 60 + Number(minute)
    const diff = currentTime - lastStatus
    const restTime = Number(contingency?.frequency) - diff

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

                        {restTime > 0 && <p>Você tem {restTime} minutos para fazer outro checkpoint!</p>}
                        {restTime <= 0 && <p className="text-red-400 font-bold">O seu tempo para fazer o checkpoint se esgotou. Uma notificação foi gerada ao administrador.</p>}
                    </div>
                    <button onClick={handleOK} className="p-2 mt-5 bg-blue-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50">
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