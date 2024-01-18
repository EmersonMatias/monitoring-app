'use client'
import { useCreateAlert } from "@/hooks/hooks-alert";
import { useGetAllTodayCheckpoint } from "@/hooks/hooks-checkpoints"
import { useEffect, useRef, } from "react"
import { checkpointsRed, delayAlert } from "../functions";

export default function RedTable({ search }: { readonly search: string }) {
    const { data: checkpoints, isSuccess, isRefetching } = useGetAllTodayCheckpoint()
    const { mutate: createAlert } = useCreateAlert()

    const alertRef = useRef()
    const PanicAudio = useRef<HTMLAudioElement | null>(null)

    const checkpointsAlert = checkpointsRed(checkpoints, search,isSuccess)

    delayAlert({ PanicAudio, alertRef, checkpointsAlert, createAlert, isSuccess })

    useEffect(() => {
        const isBrowser = typeof window !== "undefined"

        if (isBrowser) {
            PanicAudio.current = new Audio("https://teste-bucket.s3.sa-east-1.amazonaws.com/panicAudio.mp3")
        }

    }, [])

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
                    {isSuccess && checkpointsAlert?.map((vigilant: TCheckpoints) => (
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
