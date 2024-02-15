'use client'
import { useCreateAlert } from "@/hooks/hooks-alert";
import {  useFindManyCheckpoints } from "@/hooks/hooks-checkpoints"
import { useRef } from "react"
import { checkpointsRed, delayAlert } from "../functions";
import { convertTimeToBrasilia } from "@/functions/functions";
import { dateTime } from "@/app/utils/constants";

export default function RedTable({ search }: { readonly search: string }) {
    const today = new Date().toISOString()
    const { data: checkpoints, isSuccess, isFetching } = useFindManyCheckpoints({ date: today })
    const { mutate: createAlert } = useCreateAlert()

    const alertRef = useRef()

    const checkpointsAlert = checkpointsRed(checkpoints, search, isSuccess)

    delayAlert({ alertRef, checkpointsAlert, createAlert, isSuccess })

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
                    {isSuccess && checkpointsAlert?.map((checkpoint: Checkpoints) => (
                        <tr key={checkpoint?.user?.name} className={`rounded-2xl text-center ${checkpoint?.agency.name === "admin" && "hidden"}`}>
                            <td className=" px-4 py-2 max-w-[200px] text-sm ">{checkpoint?.user?.name}</td>
                            <td className="px-4 py-2 text-sm">{convertTimeToBrasilia(checkpoint?.user?.entryTime)}</td>
                            <td className="px-4 py-2 text-sm">{checkpoint?.agency.name}</td>
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
