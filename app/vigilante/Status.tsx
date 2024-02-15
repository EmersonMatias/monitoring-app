'use client'
import { useCreateMessage } from "@/hooks/hooks-messages"
import { useFindUniqueStatus, useUpdateStatus } from "@/hooks/hooks-status"
import Cookies from "js-cookie"
import { formatDateTimeToBR } from "@/functions/functions"

export default function Status() {
    const userId = Number(Cookies.get("userId"))
    const agencyId = Number(Cookies.get("agencyId"))
    const { data: status, isSuccess, isRefetching } = useFindUniqueStatus(userId)

    const { mutate: updateStatus, isPending } = useUpdateStatus()
    const { mutate: createMessage } = useCreateMessage()

    console.log(status)

    function handleOkay() {
        const id = Number(status?.id)
        const situation = "OK"

        updateStatus({ id, situation })
    }

    function hadlePanic() {
        const createMessageData: CreateMessage = {
            dateTime: new Date(),
            message: "STATUS DE PÂNICO",
            userId,
            agencyId
        }
        const id = Number(status?.id)
        const situation = "PANIC"

        createMessage(createMessageData)
        updateStatus({ id, situation })
    }

    const range = Number(status?.frequency)
    const lastTimeStatus = isSuccess && new Date(status?.timestamp).getTime()
    const currentTime = new Date().getTime()
    const diff = Math.floor((currentTime - Number(lastTimeStatus)) / 60000)
    const late = diff > range
    const afterPanic = status?.situation === "PANIC" && diff < 1

    function statusMessage() {
        if (afterPanic) return <p className="text-center font-bold">Você ainda não pode fazer sua atualização do status. Falta 1 minuto</p>
        if (status?.situation === "PANIC") return <p className="text-center">Você ja pode fazer a marcação de status</p>

        if (!late) {
            return <p className="text-center font-bold">Você ainda não pode fazer sua atualização do status. Faltam {isSuccess ? range - diff : ""} minutos</p>
        } else if (late) {
            return <p className="text-center">Você ja pode fazer a marcação de status</p>
        }
    }

    return (
        <div>
            <div className="mt-5 flex flex-col items-center text-sm pb-10">
                <p>Último status: {status?.situation}</p>
                <p>Horário do último status: {isSuccess && formatDateTimeToBR(status.timestamp)} </p>

                {statusMessage()}

                <div className="flex items-center flex-col gap-2 mt-4 ">
                    <button disabled={status?.situation === "PANIC" ? afterPanic : !late} className="p-2 bg-blue-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={handleOkay}>
                        STATUS OK
                    </button>

                    <button disabled={isPending} className="p-2 bg-orange-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={hadlePanic}>
                        STATUS PANICO DE COAÇÃO
                    </button>
                </div>
            </div>
        </div>
    )
}