import axios, { AxiosResponse } from "axios"

export type TUserCheckpoints = {
    id: number,
    date: string,
    arrived: boolean,
    arrivalTime: string,
    userId: number
}

export async function getUserCheckpoints(userId: string | undefined) {
    const res: AxiosResponse<TUserCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints/${userId}`)

    return res
}
