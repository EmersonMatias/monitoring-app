import Button from "./Button.component"
import { TUserCheckpoints, getUserCheckpoints } from "../requests"
import axios, { AxiosResponse } from "axios"
import { logged } from "@/app/utils/functions"

async function createCheckpoints(userCheckpoints: AxiosResponse<TUserCheckpoints[], any>, currentDay: string) {
    const todaysCheckpontExist = userCheckpoints.data.find((checkpoint) => checkpoint.date === currentDay)

    if (todaysCheckpontExist === undefined) {
        const sucess = (await axios.post(`${process.env.BACKEND_URL}/createcheckpoints`)).status

        return sucess
    }

}

export default async function Content() {
    const userData = logged()
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const currentDay = `${day}/${month}/${year}`
    const userCheckpoints = await getUserCheckpoints(userData.userId)
    const checkpointsCreated = await createCheckpoints(userCheckpoints, currentDay)
 
    console.log("userCheckpoints",userCheckpoints.data)

    return (
        <div>
            {userCheckpoints.data.map((checkpoint) => {
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