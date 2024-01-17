import { UseMutateFunction } from "@tanstack/react-query"
import { UseFormResetField } from "react-hook-form"

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