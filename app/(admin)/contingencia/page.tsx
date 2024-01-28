'use client'
import { dateTime } from "@/app/utils/constants"
import { useGetAllContingency } from "@/hooks/hooks-contingency"
import { useEffect, useRef } from "react"

export default function Contingency() {
    const { data: contingency, isRefetching } = useGetAllContingency()
    const { hour, minute } = dateTime()
    const testeRef = useRef<GeolocationCoordinates>()
    function late(contingency: TContigency) {
        const lastStatus = Number(contingency?.hour) * 60 + Number(contingency?.minute)
        const currentTime = Number(hour) * 60 + Number(minute)
        const diff = currentTime - lastStatus
        const restTime = Number(contingency?.frequency) - diff


        if (diff <= 5) {
            return <div className="bg-[#76a561] py-1 px-2 rounded-lg font-bold text-white">OK</div>

        } else {
            return <div className="bg-[#FC6F6F] text-base p-2 mb-4 font-bold text-center rounded-lg text-white"> ATRASADO </div>
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = position.coords
            testeRef.current = pos
            return pos
        }, null, { enableHighAccuracy: true })
    }, [])


    return (
        <main className="flex flex-col items-center">
            <table className="w-1/2 table-auto mt-10">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Último horário de checkpoint</th>
                        <th className=" px-4 py-2">Último Status</th>
                        <th className=" px-4 py-2">Frequência de Checkpoint</th>
                        <th className=" px-4 py-2">Checkpoint em atraso</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        contingency?.map((oneContingency) => (
                            oneContingency.contigency &&
                            <tr key={oneContingency.id} className=" text-center">
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.user.name}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.hour?.toString().padStart(2, "0")}:{oneContingency.minute?.toString().padStart(2, "0")}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.status}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency.frequency} minutos</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{late(oneContingency)}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <div>
                <p>Latitude: {testeRef.current?.latitude}</p>
                <p>Longitude: {testeRef.current?.longitude}</p>
            </div>
        </main>
    )
}