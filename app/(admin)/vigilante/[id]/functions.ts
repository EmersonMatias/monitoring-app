import { convertDateToBrasilia, convertTimeToBrasilia, convertTimeToUTC } from "@/functions/functions";
import { UseMutateFunction } from "@tanstack/react-query";

export function initialDataFormEditVigilant(vigilant: Vigilant) {
    const dateOfBirth = convertDateToBrasilia(vigilant.dateOfBirth)
    const entryTime = convertTimeToBrasilia(vigilant.entryTime)
    const departureTime = convertTimeToBrasilia(vigilant.departureTime)

    const initialData: UpdateVigilantForm = {
        name: vigilant.name,
        dateOfBirth,
        rg: vigilant.rg,
        cpf: vigilant.cpf,
        agencyId: `${vigilant.agencyId}`,
        entryTime,
        departureTime,
        login: vigilant.login,
        frequency: `${vigilant.status.frequency}`,
        workOnSaturday: `${vigilant.workOnSaturday}`,
        workOnSunday: `${vigilant.workOnSunday}`,
    }

    return initialData
}

export function handleFormEditVigilant(data: UpdateVigilantForm, updateVigilant: UseMutateFunction<any, Error, UpdateVigilantBody, unknown>) {
    const dateOfBirth = new Date(data.dateOfBirth)
    const frequency = Number(data.frequency)
    const entryTime = convertTimeToUTC(data.entryTime)
    const departureTime = convertTimeToUTC(data.departureTime)
    const workOnSaturday = data.workOnSaturday === "true"
    const workOnSunday = data.workOnSunday === "true"
    const agencyId = Number(data.agencyId)

    const updateVigilantBody: UpdateVigilantBody = {
        ...data,
        dateOfBirth,
        frequency,
        entryTime,
        departureTime,
        workOnSaturday,
        workOnSunday,
        agencyId
    }

    updateVigilant(updateVigilantBody)
}