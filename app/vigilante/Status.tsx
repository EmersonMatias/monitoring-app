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

    const makeCheckpoint = diff >= range
    const late = diff > (range+5)
    const minutesAfterCheckpoint = diff <= (range+5)
    const minutesRest = (range+5)-diff


    const afterPanic = status?.situation === "PANIC" && diff < 1
    const minutesAfterPanic = 6 - diff
    const afterPanicRange = status?.situation === "PANIC" && diff < 6


    console.log(minutesAfterCheckpoint)
    
    function statusMessage() {
        if (afterPanic) return <p className="text-center font-bold bg-gray-200 p-2 rounded-md text-red-500">Você ainda não pode fazer sua atualização do status. Falta 1 minuto</p>
        if (afterPanicRange) return (
            <>
                <p className="text-center font-bold text-blue-500 bg-gray-200 p-2 rounded-md">Você já pode fazer a marcaçaõ de status.</p>
                <p className="text-orange-600 font-semibold">Você tem {minutesAfterPanic} minutos, após isso, uma notificaçaõ será gerada ao adminsitrador!</p>
            </>
        )
        if (status?.situation === "PANIC") return (
            <>
                <p className="text-center bg-gray-200 p-2 rounded-md font-bold text-blue-500">Você ja pode fazer a marcação de status.</p>
                <p className="text-red-500 font-semibold">Você está atrasado! Uma notificaçao foi gerada ao adminsitrador.</p>
            </>
        )

        if (!makeCheckpoint) {
            return <p className="text-center font-bold bg-gray-200 p-2 rounded-md text-red-500">Você ainda não pode fazer sua atualização do status. Faltam {isSuccess && range - diff} minutos</p>
        } else if (minutesAfterCheckpoint) {
            return (
                <>
                    <p className="text-center font-bold text-blue-500 bg-gray-200 p-2 rounded-md">Você já pode fazer a marcaçaõ de status.</p>
                    <p className="text-orange-600 font-semibold">Você tem {minutesRest} minutos, após isso, uma notificaçaõ será gerada ao adminsitrador!</p>
                </>
            )
        } else if (late) {
            return (
                <>
                <p className="text-center bg-gray-200 p-2 rounded-md font-bold text-blue-500">Você ja pode fazer a marcação de status.</p>
                <p className="text-red-500 font-semibold">Você está atrasado! Uma notificaçao foi gerada ao adminsitrador.</p>
            </>
            )
        }
    }

    return (
        <div>
            <div className="mt-5 flex flex-col items-center text-sm pb-10">
                <p>Último status: {status?.situation}</p>
                <p>Horário do último status: {isSuccess && formatDateTimeToBR(status.timestamp)} </p>

                {statusMessage()}

                <div className="flex items-center flex-col gap-2 mt-4 ">
                    <button disabled={status?.situation === "PANIC" ? afterPanic : !makeCheckpoint} className="p-2 bg-blue-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={handleOkay}>
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