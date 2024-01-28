import { UseMutateFunction } from "@tanstack/react-query"
import { UseFormResetField } from "react-hook-form"
import { dateTime } from "../utils/constants"

export async function onSubmitFormEmergencyMessage(data: FormEmergencyMessageProps, userId: number, createMessage: UseMutateFunction<any, Error, TCreateMessageData, unknown>, resetField: UseFormResetField<FormEmergencyMessageProps>) {
    const createMessageData = {
        userId,
        message: data.message
    }

    createMessage(createMessageData)

    resetField("message")
}

export async function resetMutation(messageCreated: boolean, reset: () => void) {
    if (messageCreated) {
        return setTimeout(() => {
            reset()
        }, 5000)
    }
}

export function contingencyTime(contingency: TContigency | undefined) {
    const { hour, minute } = dateTime()
    const lastStatus = Number(contingency?.hour) * 60 + Number(contingency?.minute)
    const currentTime = Number(hour) * 60 + Number(minute)
    const diff = currentTime - lastStatus
    const restTime = Number(contingency?.frequency) - diff
    const statusOpen = restTime > 0

    const response = {
        restTime, statusOpen, diff
    }

    return response
}