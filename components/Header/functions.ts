import { FindManyContingency } from "@/hooks/hooks-contingency"
import { FindAllStatusResponse } from "@/hooks/hooks-status"
import { MutableRefObject } from "react"

export function contingencyNotifications(isSuccess: boolean, contingencies: FindManyContingency[] | undefined) {
    if (!isSuccess) return undefined

    const notifications = contingencies?.filter((contingency) => {
        const lastCheckpoint = new Date(contingency.timestamp).getTime()
        const currentTime = new Date().getTime()
        const diff = currentTime - lastCheckpoint
        const late = Math.floor(diff / 60000) > (contingency.frequency + 5)

        if (contingency.active) {
            if (late|| contingency.situation === "PANIC") return contingency
        }

    }).length

    return notifications
}

export function panicStatusAlert({ isSuccess, statusRef, status }: PanicStatusAlertProps) {
    if (!isSuccess) return null

    const currentStatusRef = statusRef.current

    if (currentStatusRef === undefined) {
        statusRef.current = status
    }

    const lengthStatus = Number(status?.filter((oneStatus) => oneStatus.situation === "PANIC").length)
    const lengthStatusRef = Number(statusRef?.current?.filter((oneStatus) => oneStatus.situation === "PANIC").length)
    const diffStatus = JSON.stringify(status) !== JSON.stringify(currentStatusRef)

    if (currentStatusRef && diffStatus && lengthStatus > lengthStatusRef) {
        const PanicAudio = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3")

        status?.forEach((oneStatus) => {
            if (oneStatus.situation === "PANIC") {
                PanicAudio.play()
                statusRef.current = status
            }
        })

    }
}

export function emergencyContingencyAlert({ isSuccess, contingenciesRef, contingencies }: EmergencyContingencyAlertProps) {
    if (!isSuccess) return null

    const currentContingency = contingenciesRef.current

    if (currentContingency === undefined) {
        contingenciesRef.current = contingencies
    }
   
    const lengthContingencies = Number(contingencies?.filter((contingency) => contingency.situation === "PANIC" && contingency.situation).length)
    const lengthContingenciesRef = Number(contingenciesRef?.current?.filter((contingency) => contingency.situation === "PANIC" && contingency.situation).length)
    const diffContingencies = JSON.stringify(contingencies) !== JSON.stringify(currentContingency)

    if (currentContingency && diffContingencies && lengthContingencies > lengthContingenciesRef) {
        const PanicAudio = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3")

        contingencies?.forEach((contingency) => {
            if (contingency.situation === "PANIC") {
                PanicAudio.play()
                contingenciesRef.current = contingencies
            }
        })

    }else{
        contingenciesRef.current = contingencies
    }
}

export function messageAlert({ isSuccess, messages, messagesRef }: MessageAlertProps) {
    if (!isSuccess) return null

    const currentMessagesRef = messagesRef.current

    if (currentMessagesRef === undefined) {
        messagesRef.current = messages
        return null
    }

    const diffMessagesLength = Number(messages?.length) > Number(currentMessagesRef?.length)
    const diffMessages = JSON?.stringify(messages) !== JSON?.stringify(currentMessagesRef)

    if (currentMessagesRef && diffMessages && messages && diffMessagesLength) {
        const AlertAudio = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/alertAudio.mp3")

        AlertAudio.play()
        messagesRef.current = messages
    }
}

type MessageAlertProps = {
    isSuccess: boolean
    messagesRef: MutableRefObject<Message[] | undefined>
    messages: Message[] | undefined
}

type PanicStatusAlertProps = {
    isSuccess: boolean
    statusRef: MutableRefObject<FindAllStatusResponse[] | undefined>,
    status: FindAllStatusResponse[] | undefined
}

type EmergencyContingencyAlertProps = {
    isSuccess: boolean
    contingenciesRef: MutableRefObject<FindManyContingency[] | undefined>,
    contingencies: FindManyContingency[] | undefined
}

