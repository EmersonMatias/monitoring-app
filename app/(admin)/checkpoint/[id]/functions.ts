import { UseMutateFunction } from "@tanstack/react-query"

export function onSubmitCreateCheckpointForm(
    data: TCreateCheckpointForm,
    userId: number,
    createCheckpoint: UseMutateFunction<any, Error, TCreateCheckpointData, unknown>
) {
    const [year, month, day] = data.date.split("-").map(Number)

    const createCheckpointData = { day, month, year, userId }

    createCheckpoint(createCheckpointData)
}