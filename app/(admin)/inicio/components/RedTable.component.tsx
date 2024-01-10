'use client'
import { currentTime } from "@/app/utils/constants"
import { useGetAllTodayCheckpoint } from "@/hooks/hooks-checkpoints"
import { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"

export default function RedTable({ search }: { search: string }) {
    const isBrowser = typeof window !== "undefined";
    const { data: checkpoints, isSuccess } = useGetAllTodayCheckpoint()
    const { hour, minutes } = currentTime()

    const checkpointsAlert = checkpoints?.filter((checkpoints) =>
        checkpoints.arrived === false &&
        (Number(checkpoints.user.entryTime.substring(0, 2)) < hour ||
            (Number(checkpoints.user.entryTime.substring(0, 2)) == hour && Number(checkpoints.user.entryTime.substring(3, 5)) < minutes))
    )
    const alertRef = useRef<TCheckpoints[]>()
    const checkpointsFilter = checkpointsAlert?.filter((checkpoints) => checkpoints.user.agency.toLowerCase().includes(`${search}`))
    const checkpointView = search.length === 0 ? checkpointsAlert : checkpointsFilter
    const [update, setUpdate] = useState(false)
    const PanicAudio = useRef(isBrowser ? new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3") : null)
    const alerts = Cookies.get("alerts")

    if (alerts === undefined) {
        const alertsList: TAlert[] = []

        Cookies.set("alerts", JSON.stringify(alertsList))
    }

    
    if (isSuccess) {
        if (alertRef?.current === undefined) {
            alertRef.current = checkpointsAlert
        }

        if (alertRef?.current !== undefined && checkpointsAlert !== undefined) {
            if (JSON.stringify(alertRef?.current) !== JSON.stringify(checkpointsAlert)) {
                console.log(checkpointsAlert?.length, alertRef?.current?.length)
                if (checkpointsAlert?.length > alertRef?.current?.length) {
                    PanicAudio.current?.play()

                    const list = alerts !== undefined &&  JSON.parse(alerts)
                    const lengthList = list?.length
                    const newAlert = {id: lengthList, viewed: false}
                    const newList = [...list, newAlert]
                    Cookies.set("alerts", JSON?.stringify(newList))
                    
                    alertRef.current = checkpointsAlert
                }


            }
        }

    }

    useEffect(() => {


        const interval = setInterval(() => {
            setUpdate(!update)
        }, 3000);


        return () => clearInterval(interval);

    }, [update])

    return (

        <div className="max-w-[600px] overflow-x-auto  mt-6  flex flex-col items-center bg-[#FFFFFF] p-5  border-[2px] rounded-2xl">
            <div className="bg-[#FC6F6F] text-base p-1 mb-4 font-bold text-center rounded-lg text-white">
                STATUS DE CHEGADA ALERTA
            </div>

            <table className="w-full table-auto ">
                <thead>
                    <tr>
                        <th className=" px-4 py-2 text-sm">Nome do Vigilante</th>
                        <th className=" px-4 py-2 text-sm">Horário de Entrada</th>
                        <th className=" px-4 py-2 text-sm">Agência</th>
                        <th className=" px-4 py-2 text-sm">Status Atual</th>
                    </tr>
                </thead>
                <tbody>
                    {checkpointView?.map((vigilant: TCheckpoints) => (
                        <tr key={vigilant.user.name} className={`rounded-2xl text-center ${vigilant.user.agency === "admin" && "hidden"}`}>
                            <td className="  px-4 py-2 max-w-[200px] text-sm ">{vigilant.user.name}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.entryTime}</td>
                            <td className="px-4 py-2 text-sm">{vigilant.user.agency}</td>
                            <td className="px-4 py-2  justify-center items-center text-sm">
                                <div className="bg-[#FC6F6F] text-white py-1 px-2 rounded-lg font-bold">Alerta</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

type TRedTable = {
    vigilantAlert: TCheckpoints[]
}