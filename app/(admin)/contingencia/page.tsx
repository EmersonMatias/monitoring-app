'use client'
import { dateTime } from "@/app/utils/constants"
import { useGetAllContingency } from "@/hooks/hooks-contingency"
import { useRef } from "react"

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
    if (typeof window !== 'undefined') {

        navigator.geolocation.getCurrentPosition((position) => {
            const pos = position.coords
            testeRef.current = pos
            return pos
        }, null, { enableHighAccuracy: true })
    }


    function haversine(lat1: number, lon1: number, lat2: number | undefined, lon2: number | undefined) {
        const R = 6371; // Raio médio da Terra em km

        const dlat = toRadians(Number(lat2) - lat1);
        const dlon = toRadians(Number(lon2) - lon1);

        const a = Math.sin(dlat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(Number(lat2))) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = (R * c) * 1000; // Distância em km
        return distance;
    }

    function toRadians(degrees: number) {
        return degrees * (Math.PI / 180);
    }

    const lat1 = -21.1175121;
    const lon1 = -47.8167268;

    const distance = haversine(lat1, lon1, testeRef.current?.latitude, testeRef.current?.longitude);
    console.log(testeRef)

    console.log(`Distância entre os pontos: ${distance.toFixed(2)} m`);

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
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{oneContingency?.user?.name}</td>
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
                <p>Latitude atual: {testeRef.current?.latitude}</p>
                <p>Longitude atual: {testeRef.current?.longitude}</p>
                <p>Distância entre os pontos: {distance.toFixed(2)} m</p>
            </div>
        </main>
    )
}