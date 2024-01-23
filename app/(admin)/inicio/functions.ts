import { dateTime } from "@/app/utils/constants"
import { UseMutateFunction } from "@tanstack/react-query"
import { MutableRefObject } from "react"

export function checkpointsGreen(checkpoints: TCheckpoints[] | undefined, search: string) {
    const checkpointsOK = checkpoints?.filter((checkpoints) => checkpoints.arrived === true)
    const checkpointsFilter = checkpointsOK?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search.toLowerCase()}`))
    if (search.length === 0) {
        return checkpointsOK
    } else return checkpointsFilter

}

export function checkpointsRed(checkpoints: TCheckpoints[] | undefined, search: string, isSuccess: boolean) {
    if(!isSuccess) return undefined
    
    const { hour, minute } = dateTime()

    const checkpointsAlert = checkpoints?.filter((checkpoint) => {
        const hourMinutes = Number(hour) * 60 + Number(minute)
        const checkpointHourMinutes = Number(checkpoint.user.entryTime.substring(0, 2)) * 60 + Number(checkpoint.user.entryTime.substring(3, 5))

        if (!checkpoint.arrived && hourMinutes > checkpointHourMinutes) return checkpoint
    })

    const checkpointsAlertSearch = checkpointsAlert?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search.toLowerCase()}`))

    if (search.length === 0) {
        return checkpointsAlert
    } else return checkpointsAlertSearch
}

export function checkpointsOrange(checkpoints: TCheckpoints[] | undefined, search: string, isSuccess: boolean) {
    if(!isSuccess) return undefined
    
    const { hour, minute } = dateTime()

    const checkpointsWaiting = checkpoints?.filter((checkpoint) => {
        const hourMinutes = Number(hour) * 60 + Number(minute)
        const checkpointHourMinutes = Number(checkpoint.user.entryTime.substring(0, 2)) * 60 + Number(checkpoint.user.entryTime.substring(3, 5))

        if (!checkpoint.arrived && hourMinutes <= checkpointHourMinutes) return checkpoint
    })

    const checkpointsWaitingSearch = checkpointsWaiting?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search.toLowerCase()}`))

    if (search.length === 0) {
        return checkpointsWaiting
    } else return checkpointsWaitingSearch
}

export function delayAlert({alertRef, checkpointsAlert, createAlert, isSuccess }: DelayAlertProps) {
    if (!isSuccess) return null
    
    const currentAlertRef = alertRef.current

    if (currentAlertRef === undefined) {
        alertRef.current = checkpointsAlert
        return null
    }

   
    const lengthAlertRef = Number(currentAlertRef?.length)
    const lengthCheckpointsAlert = Number(checkpointsAlert?.length)
    const diffAlertArray = JSON.stringify(alertRef?.current) !== JSON.stringify(checkpointsAlert)

    if (currentAlertRef && checkpointsAlert && diffAlertArray && (lengthCheckpointsAlert > lengthAlertRef)) {
        const diferencaArray = checkpointsAlert.filter(item => !alertRef.current?.includes(item))
        const nameVigilant = diferencaArray[0]?.user?.name
        const PanicAudio = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3")

        //Cria alerta de atraso
        createAlert(nameVigilant)
        alertRef.current = checkpointsAlert
        return  PanicAudio.play()
    }
}


type DelayAlertProps = {
    alertRef: MutableRefObject<TCheckpoints[] | undefined>,
    checkpointsAlert: TCheckpoints[] | undefined,
    createAlert: UseMutateFunction<any, Error, string | undefined, unknown>,
    isSuccess: boolean
}