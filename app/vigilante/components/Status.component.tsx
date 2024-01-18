'use client'

import { dateTime } from "@/app/utils/constants"
import { useGetByUserIDContingency } from "@/hooks/hooks-contingency"
import { useCreateMessage } from "@/hooks/hooks-messages"
import { useUpdateStatus } from "@/hooks/hooks-status"
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"

type TStatus = {
    id: number,
    hour: number,
    minute: number,
    status: string,
    userId: number,
    frequency: number
}

export default function StatusButton({ userId }: { readonly userId: number }) {
    const { data: contingency, isSuccess: contingencySuccess } = useGetByUserIDContingency(Number(userId))
    const { hour, minute } = dateTime()
    const [update, setUpdate] = useState(false)

    const { data: status, isSuccess } = useQuery({
        queryKey: ["statusID"],
        queryFn: async () => {

            const data: AxiosResponse<TStatus> = await axios.get(`${process.env.BACKEND_URL}/status/findbyid=${userId}`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })

    const { mutate: updateStatus } = useUpdateStatus()
    const { mutate: createMessage } = useCreateMessage()

    function handleOkay() {
        const updateStatusData: TUpdateStatus = {
            newStatus: "OK",
            statusID: status?.id
        }
        updateStatus(updateStatusData)
    }

    function hadlePanic() {
        const createMessageData = {
            message: "STATUS DE PÂNICO",
            userId
        }
        const updateStatusData = {
            newStatus: "PANIC",
            statusID: status?.id
        }

        createMessage(createMessageData)
        updateStatus(updateStatusData)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setUpdate(!update)
        }, 3000);


        return () => clearInterval(interval);

    }, [update])

    const currentTime = Number(hour) * 60 + Number(minute)
    const lastUpdate = isSuccess && status.hour * 60 + status.minute
    const diff = currentTime - Number(lastUpdate)

    const max = diff > Number(status?.frequency) || diff < 0
    const afterPanic = status?.status === "PANIC" && diff < 1

    function statusTime() {
        if (afterPanic) {
            return true
        } else if (!max && status?.status === "OK") {
            return true
        } else if (max) {
            return false
        }
    }

    function statusMessage() {
        if (afterPanic) {
            return <p className="text-center font-bold">Você ainda não pode fazer sua atualização do status. Falta 1 minuto.</p>
        } else if (!max && status?.status === "OK") {
            return <p className="text-center font-bold">Você ainda não pode fazer sua atualização do status. Faltam {isSuccess ? Number(status?.frequency) - diff : ""} minutos</p>
        } else if (max) {
            return <p className="text-center">Você ja pode fazer a marcação de status</p>
        }
    }

    return (
        <div>
            {(contingencySuccess && !contingency.contigency) &&
                <div className="mt-5 flex flex-col items-center text-sm pb-10">
                    <p>Último status: {status?.status}</p>
                    <p>Horário do último status: {isSuccess ?
                        `${status?.hour?.toString().padStart(2, "0")}:${status?.minute?.toString().padStart(2, "0")}`
                        : ""} </p>

                    {statusMessage()}

                    <div className="flex items-center flex-col gap-2 mt-4 ">
                        <button disabled={statusTime()} className="p-2 bg-blue-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={handleOkay}>
                            STATUS OK
                        </button>

                        <button className="p-2 bg-orange-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={hadlePanic}>
                            STATUS PANICO DE COAÇÃO
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}