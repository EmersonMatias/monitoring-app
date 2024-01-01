'use client'
import Button from "./Button.component"
import { TUserCheckpoints } from "../requests"
import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

async function createCheckpoints(userCheckpoints: TUserCheckpoints[], currentDay: string) {
    const todaysCheckpontExist = userCheckpoints.find((checkpoint) => checkpoint.date === currentDay)

    if (todaysCheckpontExist === undefined) {
        const sucess = (await axios.post(`${process.env.BACKEND_URL}/createcheckpoints`)).status

        return sucess
    }

}

export default function Content() {
    const userId = Cookies.get("userId")
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const currentDay = `${day}/${month}/${year}`
    const [userCheckpoints, setUserCheckpoints] = useState<TUserCheckpoints[]>([])
    const token = Cookies.get("token")
    const router = useRouter()

    useEffect(() => {
        const getUserCheckpoints = async () => {
            const checkpoitsUser: AxiosResponse<TUserCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints/${userId}`)
            setUserCheckpoints(checkpoitsUser.data)
            const checkpointsCreated = await createCheckpoints(checkpoitsUser.data, currentDay)

        }

        if (token === undefined) {
            return router.push("/")
        }

        getUserCheckpoints()

    }, [userId, router, currentDay, token])

    return (
        <div>
            {userCheckpoints.map((checkpoint) => {
                if (checkpoint.date === currentDay) {
                    return (
                        <div key={checkpoint.id} className="flex flex-col gap-3">
                            <p><span className="font-bold">Dia:</span> {checkpoint.date}</p>
                            <p><span className="font-bold">Horário de Chegada:</span> {checkpoint.arrivalTime === "null" ? "Checkpoint não cadastrado" : checkpoint.arrivalTime} </p>

                            <p className=" flex">
                                <span className="font-bold">Checkpoint Status: </span>
                                {checkpoint.arrived ?
                                    <span className="bg-green-500 p-2 rounded-md text-white font-bold">Checkpoint realizado com sucesso</span> :
                                    <span className="bg-red-500 p-2 rounded-md text-white font-bold text-center">Aguardando checkpoint</span>}
                            </p>
                            <Button checkpoint={checkpoint} />
                        </div>)
                }
            })}

        </div>
    )
}