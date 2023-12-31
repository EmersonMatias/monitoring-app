'use client'
import Button from "./Button.component"
import { TUserCheckpoints } from "../requests"
import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function Content() {
    const queryClient = useQueryClient()
    const userId = Cookies.get("userId")
    const { mutate } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`${process.env.BACKEND_URL}/checkpoints/createall`)
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



    return (
        <div>
            <div key={checkpoint?.id} className="flex flex-col gap-2 mt-2 text-base">

                <p><span className="font-bold">Dia: </span>
                    {isSuccess && `${checkpoint?.day?.toString().padStart(2, "0")}/
                    ${checkpoint?.month?.toString().padStart(2, "0")}/
                    ${checkpoint?.year?.toString().padStart(2, "0")}`}
                </p>
                <p><span className="font-bold">Horário de Chegada:</span> {checkpoint?.arrivalTime === "null" ? "Checkpoint não cadastrado" : checkpoint?.arrivalTime} </p>

                <p className=" flex items-center">
                    <span className="font-bold ">Checkpoint Status: </span>
                    {checkpoint?.arrived ?
                        <span className="bg-green-500 p-2 text-sm rounded-md text-white font-bold ml-2">Checkpoint realizado com sucesso</span> :
                        <span className="bg-red-500 p-2 rounded-md text-sm text-white font-bold text-center ml-2">Aguardando checkpoint</span>}
                </p>
                <Button checkpoint={checkpoint} />
            </div>

        </div>
    )
}