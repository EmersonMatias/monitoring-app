import axios, { AxiosResponse } from "axios"

export type TUserCheckpoints = {
    id: number,
    date: string,
    arrived: boolean,
    arrivalTime: string,
    userId: number
}

export async function getUserCheckpoints(userId: string | undefined) {
    const res: AxiosResponse<TUserCheckpoints[]> = await axios.get(`http://localhost:4000/checkpoints/${userId}`)

    return res
}
