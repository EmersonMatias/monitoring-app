import { UseMutateFunction } from "@tanstack/react-query"

export function onSubmitCreateCheckpointForm(data: TCreateCheckpointForm, userId: number,createCheckpoint: UseMutateFunction<any, Error, TCreateCheckpointData, unknown>) {
    const dateSplit = data.date.split("-")
    const year = Number(dateSplit[0])
    const month = Number(dateSplit[1])
    const day = Number(dateSplit[2])

    const createCheckpointData = {
        day, month, year, userId
    }

    createCheckpoint(createCheckpointData)
}