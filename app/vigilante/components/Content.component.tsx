'use client'
import Button from "./Button.component"
import { TUserCheckpoints } from "../requests"
import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { formatarDataParaPTBR } from "@/app/(admin)/estatistica/page"

export default function Content() {
    const queryClient = useQueryClient()
    const userId = Cookies.get("userId")
    const { mutate } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${process.env.BACKEND_URL}/createcheckpoints`)
            console.log(response)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["usercheckpoints"] })
        },
        onError: () => {
            console.log("FALHA AO CRIAR CHECKPOINTS")
        }
    })

    const { data: checkpoint, isSuccess } = useQuery({
        queryKey: ['usercheckpoints'],
        queryFn: async () => {
            const data: AxiosResponse<TUserCheckpoints> = await axios.get(`${process.env.BACKEND_URL}/checkpoints/currentday/${userId}`)
            console.log(userId)
            console.log(data.data)

            if (!data?.data) {
                mutate()
            }

            return data.data
        }
    })

   
    console.log(typeof(checkpoint?.date))
    return (
        <div>
            <div key={checkpoint?.id} className="flex flex-col gap-3">
                <p><span className="font-bold">Dia:</span>{isSuccess && formatarDataParaPTBR(checkpoint?.date)}</p>
                <p><span className="font-bold">Horário de Chegada:</span> {checkpoint?.arrivalTime === "null" ? "Checkpoint não cadastrado" : checkpoint?.arrivalTime} </p>

                <p className=" flex">
                    <span className="font-bold">Checkpoint Status: </span>
                    {checkpoint?.arrived ?
                        <span className="bg-green-500 p-2 rounded-md text-white font-bold">Checkpoint realizado com sucesso</span> :
                        <span className="bg-red-500 p-2 rounded-md text-white font-bold text-center">Aguardando checkpoint</span>}
                </p>
                <Button checkpoint={checkpoint} />
            </div>

        </div>
    )
}