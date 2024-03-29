import { UseMutateFunction } from "@tanstack/react-query"

export function onSubmitCreateCheckpointForm(
    data: CreateCheckpointForm,
    userId: number,
    createCheckpoint: UseMutateFunction<any, Error, CreateCheckpoint, unknown>
) {
    const date = new Date(data.date)

    const createCheckpointData = {date, userId}

    createCheckpoint(createCheckpointData)
}