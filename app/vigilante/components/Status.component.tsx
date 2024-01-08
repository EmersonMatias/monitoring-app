'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export default function StatusButton({ userId }: { userId: number }) {
    const queryClient = useQueryClient()

    const { data, isSuccess } = useQuery({
        queryKey: ["statusID"],
        queryFn: async () => {

            const data = await axios.get(`${process.env.BACKEND_URL}/status/findbyid=${userId}`)
            return data.data
        }
    })

    const { mutate: updateStatus, isPending } = useMutation({
        mutationFn: async (newStatus: string) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/status/updatebyid=${data.id}`, { newStatus })
            console.log(response)
            return data.data
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

    const date1 = new Date(data?.time)
    const date2 = new Date()

    const hoursMi = Number(date1.toLocaleTimeString().substring(0, 2)) * 60 + Number(date1.toLocaleTimeString().substring(3, 5))
    const hourMi2 = Number(date2.toLocaleTimeString().substring(0, 2)) * 60 + Number(date2.toLocaleTimeString().substring(3, 5))

    const dif = hourMi2 - hoursMi
    const max = dif > 60


    return (
        <div className="mt-20 flex flex-col items-center ">
            <p>Último status: {data?.status}</p>
            <p>Horário do último status: {isSuccess ? (new Date(data?.time)).toLocaleTimeString() : ""} </p>

            {max && <p>Você ja pode fazer a marcação de status</p>}
            {!max && <p>Você ainda não pode fazer sua atualização do status. Faltam {isSuccess ? 60 - dif : ""} minutos</p>}

            <div className="flex items-center flex-col gap-10 mt-10">
                <button disabled={isPending || !max} className="p-3 bg-blue-500 rounded-md text-white font-bold max-w-[200px] min-w-[200px] disabled:opacity-50" onClick={handleOkay}>
                    STATUS OK
                </button>

                <button disabled={isPending || !max} className="p-3 bg-orange-500 rounded-md text-white font-bold max-w-[200px] min-w-[200px] disabled:opacity-50" onClick={hadlePanic}>
                    STATUS PANICO DE COAÇÃO
                </button>
            </div>
        </div>
    )
}