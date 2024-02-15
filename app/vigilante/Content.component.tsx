'use client'
import Cookies from "js-cookie"
import Checkpoint from "./Checkpoint"
import { useFindUniqueCheckpoint } from "@/hooks/hooks-checkpoints"
import { useEffect, useState } from "react"
import {  convertTimeToBrasilia, formatDateToBR } from "@/functions/functions"

export default function Content() {
    const userId = Number(Cookies.get("userId"))
    const [name, setName] = useState<string | undefined>()
    const date = new Date().toISOString()
    const { data: checkpoint, isSuccess } = useFindUniqueCheckpoint({ userId, date })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const name = Cookies.get("name")
            setName(name)
        }
    }, [])

    return (
        <div>
            <div key={checkpoint?.id} className="flex flex-col gap-2 mt-2 text-base">
                <p className="text-base font-semibold mt-4">Vigilante: {name}</p>
                <p><span className="font-bold">Dia: </span>{isSuccess && formatDateToBR(checkpoint.date)}</p>
                <p><span className="font-bold">Horário de Chegada:</span> {checkpoint?.arrivalTime === null ? "Checkpoint não cadastrado" : convertTimeToBrasilia(checkpoint?.arrivalTime)} </p>

                <p className=" flex items-center">
                    <span className="font-bold ">Checkpoint Status: </span>
                    {checkpoint?.arrived ?
                        <span className="bg-green-500 p-2 text-sm rounded-md text-white font-bold ml-2">Checkpoint realizado com sucesso</span> :
                        <span className="bg-red-500 p-2 rounded-md text-sm text-white font-bold text-center ml-2">Aguardando checkpoint</span>}
                </p>
                <Checkpoint checkpoint={checkpoint} />
            </div>
        </div>
    )
}
