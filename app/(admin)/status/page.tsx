'use client'
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export default function Page() {
    const { data: status } = useQuery({
        queryKey: ["status"],
        queryFn: async () => {
            const data: AxiosResponse<TStatus[]> = await axios.get(`${process.env.BACKEND_URL}/status/getall`)
            return data.data
        }
    })

    console.log(status)

    return (
        <div className="flex justify-center">

            <table className="w-1/2 table-auto mt-10">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Horário de Entrada</th>
                        <th className=" px-4 py-2">Horário de Saída</th>
                        <th className=" px-4 py-2">Agência</th>
                        <th className=" px-4 py-2">Status</th>
                        <th className=" px-4 py-2">Último Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        status?.map((eachStatus) => (
                            <tr key={eachStatus.id} className=" text-center">
                                <td className=" px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{eachStatus.user.name}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.user.entryTime}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.user.departureTime}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.user.agency}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.status}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{(new Date(eachStatus.time)).toLocaleTimeString()}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

type TUser = {
    name: string,
    entryTime: string,
    departureTime:string,
    agency: string
}
type TStatus = {
    id: 4,
    time: Date,
    status: string,
    userId: number,
    user: TUser
}