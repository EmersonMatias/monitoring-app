import {  convertTimeToUTC } from "@/functions/functions"
import { UseMutateFunction } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

export function handleCreateVigilantForm(data: CreateVigilantForm, createUser: UseMutateFunction<AxiosResponse<any, any>, Error, VigilantBody, unknown>) {
    const agencyId = Number(data.agencyId)
    const frequency = Number(data.frequency)
    const workOnSunday = data.workOnSunday === "true"
    const workOnSaturday = data.workOnSaturday === "true"
    const entryTime = convertTimeToUTC(data.entryTime)
    const departureTime = convertTimeToUTC(data.departureTime)
    const dateOfBirth = new Date(data.dateOfBirth)
 
    const createVigilantData: VigilantBody = {
        ...data,
        agencyId,
        frequency,
        workOnSaturday,
        workOnSunday,
        entryTime,
        departureTime,
        dateOfBirth,
        accountType: 'user'
    }

    createUser(createVigilantData)
}