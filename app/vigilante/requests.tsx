import axios, { AxiosResponse } from "axios"

export type TUserCheckpoints = {
    id: number,
    date: string,
    arrived: boolean,
    arrivalTime: string,
    userId: number
}

