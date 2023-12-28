import Button from "./Button.component"
import { TUserCheckpoints, getUserCheckpoints } from "../requests"
import axios, { AxiosResponse } from "axios"

async function createCheckpoints(userCheckpoints: AxiosResponse<TUserCheckpoints[], any>, currentDay: string) {
    const todaysCheckpontExist = userCheckpoints.data.find((checkpoint) => checkpoint.date === currentDay)

    if (todaysCheckpontExist === undefined) {
        const sucess = (await axios.post(`${process.env.BACKEND_URL}/createcheckpoints`)).status

        return sucess
    }

}

export default async function Content() {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const currentDay = `${day}/${month}/${year}`
    const userId = 1
    const userCheckpoints = await getUserCheckpoints(userId)
  
    const checkpointsCreated = await createCheckpoints(userCheckpoints, currentDay)

    console.log(userCheckpoints)

    return (
        <div>
            {userCheckpoints.data.map((checkpoint) => {
                if (checkpoint.date === currentDay) {
                    return (
                        <div key={checkpoint.id}>
                            <div><span className="font-bold">Dia:</span> {checkpoint.date}</div>
                            <div><span className="font-bold">Horário de Chegada:</span> {checkpoint.arrivalTime === "null" ? "Checkpoint não cadastrado" : checkpoint.arrivalTime} </div>

                            <div>
                                <span className="font-bold">Checkpoint Status: </span>
                                {checkpoint.arrived ?
                                    <span className="bg-green-500">Checkpoint realizado com sucesso!</span> :
                                    <span className="bg-red-500">Aguardando checkpoint.</span>}
                            </div>
                            <Button checkpoint={checkpoint} />
                        </div>)
                }
            })}

        </div>
    )
}