import { UseMutateFunction } from "@tanstack/react-query";

export function initialDataFormEditVigilant(vigilant: TVigilant2) {
    const [day, month, year] = vigilant.dateofbirth.split("/")
    const dateofbirth = `${year}-${month}-${day}`

    const initialData: TUpdateUser = {
        name: vigilant.name,
        dateofbirth,
        rg: vigilant.rg,
        cpf: vigilant.cpf,
        agencyId: vigilant.agency?.id,
        entryTime: vigilant.entryTime,
        departureTime: vigilant.departureTime,
        login: vigilant.login,
        frequency: vigilant?.status[0]?.frequency,
        saturday: `${vigilant.saturday}`,
        sunday: `${vigilant.sunday}`,
    }

    return initialData
}

export function handleFormEditVigilant(
    data: TUpdateUser,
    updateVigilant: UseMutateFunction<any, Error, TUpdateUser & { id: number; }, unknown>,
    id: number) {
    const updateVigilantData = {
        ...data, id
    }
    updateVigilant(updateVigilantData)
}