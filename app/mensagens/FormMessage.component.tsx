'use client'
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

type TResponseData = {
    response: string,
    messageId: number
}

async function handleSubmit(event: FormEvent<HTMLFormElement>,responseData:TResponseData, router: AppRouterInstance){
    const sucess = await axios.put(`${process.env.BACKEND_URL}/visualizarmensagem`, responseData)

    if(sucess.status === 200){
        router.refresh()
    }

}

export default function FormMessage({messageId}: {messageId: number}) {
    const router = useRouter()
    const [responseData , setResponseData] = useState<TResponseData>({
        messageId, response: ""
    })

    return (
        <form className="flex flex-col" onSubmit={(event) => handleSubmit(event,responseData, router)}>
            <label htmlFor="name" className="text-xl mb-2 font-bold">Tratamento de Mensagem:</label>
            <input
                type="text"
                className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
                id="name"
                placeholder="Faça o tratamento da mensagem"
                required
                onChange={(event) => setResponseData({...responseData, response: event.target.value})}
                minLength={10}
            />

            <div className="flex justify-center">
                <button className="bg-red-400 p-4 font-bold text-white rounded-md">Visualizar mensagem</button>
            </div>
        </form>
    )
}