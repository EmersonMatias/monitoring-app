'use client'

import { dateTime } from "@/app/utils/constants"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"


type TStatus = {
    id: number,
    hour: number,
    minute: number,
    status: string,
    userId: number,
    frequency: number
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
    const max = diff > Number(status?.frequency) || diff < 0

    return (
        <div className="mt-5 flex flex-col items-center text-sm">
            <p>Último status: {status?.status}</p>
            <p>Horário do último status: {isSuccess ?
                `${status?.hour?.toString().padStart(2, "0")}:${status?.minute?.toString().padStart(2, "0")}`
                : ""} </p>

            {(max || diff < 0) && <p className="text-center">Você ja pode fazer a marcação de status</p>}
            {!max && <p className="text-center font-bold">Você ainda não pode fazer sua atualização do status. Faltam {isSuccess ? Number(status?.frequency) - diff : ""} minutos</p>}

            <div className="flex items-center flex-col gap-2 mt-4 ">
                <button disabled={isPending || !max} className="p-2 bg-blue-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={handleOkay}>
                    STATUS OK
                </button>

                <button className="p-2 bg-orange-500 rounded-md text-white font-bold max-w-[250px] min-w-[250px] disabled:opacity-50" onClick={hadlePanic}>
                    STATUS PANICO DE COAÇÃO
                </button>
            </div>
        </div>
    )
}