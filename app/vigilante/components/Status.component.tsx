'use client'

import { dateTime } from "@/app/utils/constants"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"


type TStatus = {
    id: number,
    hour: number,
    minute: number,
    status: string,
    userId: number
}

export default function StatusButton({ userId }: { userId: number }) {
    const queryClient = useQueryClient()
    const { hour, minute } = dateTime()

    const { data: status, isSuccess } = useQuery({
        queryKey: ["statusID"],
        queryFn: async () => {

            const data: AxiosResponse<TStatus> = await axios.get(`${process.env.BACKEND_URL}/status/findbyid=${userId}`)
            return data.data
        }
    })

    console.log(status)

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: async (newStatus: string) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/status/updatebyid=${status?.id}`, { newStatus })
            console.log(response)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["statusID"] })
        }
    })


    function handleOkay() {
        const statusOkay = "OK"
        updateStatus(statusOkay)
    }

    function hadlePanic() {
        const statusPanic = "PANIC"
        updateStatus(statusPanic)
    }

    const currentTime = Number(hour) * 60 + Number(minute)
    const lastUpdate = isSuccess && status.hour * 60 + status.minute
    const diff = currentTime - Number(lastUpdate)
    console.log(currentTime, lastUpdate)
    const max = diff > 60

    console.log(diff)
    return (
        <div className="mt-20 flex flex-col items-center ">
            <p>Último status: {status?.status}</p>
            <p>Horário do último status: {isSuccess ?
                `${status.hour.toString().padStart(2, "0")}:${status.minute.toString().padStart(2, "0")}`
                : ""} </p>

            {max && <p>Você ja pode fazer a marcação de status</p>}
            {!max && <p>Você ainda não pode fazer sua atualização do status. Faltam {isSuccess ? 60-diff : ""} minutos</p>}

            <div className="flex items-center flex-col gap-10 mt-10">
                <button disabled={isPending || !max} className="p-3 bg-blue-500 rounded-md text-white font-bold max-w-[200px] min-w-[200px] disabled:opacity-50" onClick={handleOkay}>
                    STATUS OK
                </button>

                <button className="p-3 bg-orange-500 rounded-md text-white font-bold max-w-[200px] min-w-[200px] disabled:opacity-50" onClick={hadlePanic}>
                    STATUS PANICO DE COAÇÃO
                </button>
            </div>
        </div>
    )
}