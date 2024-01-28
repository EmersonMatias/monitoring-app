import { dateTime } from "@/app/utils/constants"
import { MutableRefObject } from "react"

export function contingencyNotifications(isSuccess: boolean, contingencies: TContigency[] | undefined) {
    if (!isSuccess) return undefined
    const { hour, minute } = dateTime()

    const notifications = contingencies?.filter((contingency) => {
        const lastStatus = Number(contingency?.hour) * 60 + Number(contingency?.minute)
        const currentTime = Number(hour) * 60 + Number(minute)
        const diff = currentTime - lastStatus
        if (contingency.contigency) {
            if (diff > 5 || contingency.status === "EMERGENCY") return contingency
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

    const lengthStatus = Number(status?.filter((oneStatus) => oneStatus.status === "PANIC").length)
    const lengthStatusRef = Number(statusRef?.current?.filter((oneStatus) => oneStatus.status === "PANIC").length)
    const diffStatus = JSON.stringify(status) !== JSON.stringify(currentStatusRef)

    if (currentStatusRef && diffStatus && lengthStatus > lengthStatusRef) {
        const PanicAudio = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3")

        status?.forEach((oneStatus) => {
            if (oneStatus.status === "PANIC") {
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
    console.log(contingencies)
    console.log(currentContingency)

    const lengthContingencies = Number(contingencies?.filter((contingency) => contingency.status === "EMERGENCY" && contingency.contigency).length)
    const lengthContingenciesRef = Number(contingenciesRef?.current?.filter((contingency) => contingency.status === "EMERGENCY" && contingency.contigency).length)
    const diffContingencies = JSON.stringify(contingencies) !== JSON.stringify(currentContingency)
    console.log(diffContingencies)
    console.log(lengthContingencies)
    console.log(lengthContingenciesRef)

    if (currentContingency && diffContingencies && lengthContingencies > lengthContingenciesRef) {
        const PanicAudio = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3")

        contingencies?.forEach((contingency) => {
            if (contingency.status === "EMERGENCY") {
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
    messagesRef: MutableRefObject<TMessage[] | undefined>
    messages: TMessage[] | undefined
}

type PanicStatusAlertProps = {
    isSuccess: boolean
    statusRef: MutableRefObject<TStatusWithUser[] | undefined>,
    status: TStatusWithUser[] | undefined
}

type EmergencyContingencyAlertProps = {
    isSuccess: boolean
    contingenciesRef: MutableRefObject<TContigency[] | undefined>,
    contingencies: TContigency[] | undefined
}

