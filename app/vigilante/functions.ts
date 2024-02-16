import Cookies from "js-cookie"
import { dateTime } from "../utils/constants"
import { UseFormResetField } from "react-hook-form"
import { UseMutateFunction } from "@tanstack/react-query"

export async function onSubmitNewMessage({ data, resetField, createMessage }: OnSubmitMessage) {
    const agencyId = Number(Cookies.get('agencyId'))
    const userId = Number(Cookies.get('userId'))
    const dateTime = new Date()
    console.log(agencyId, userId)

    const createMessageData: CreateMessage = {
        userId,
        message: data.message,
        agencyId,
        dateTime
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



type OnSubmitMessage = {
    data: FormNewMessage
    resetField: UseFormResetField<FormNewMessage>
    createMessage: UseMutateFunction<any, Error, CreateMessage, unknown>
}