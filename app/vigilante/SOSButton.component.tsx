'use client'
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

type TData = {
    userId: number | undefined;
    message: string;
}

async function handleForm(event: FormEvent<HTMLFormElement>, data: TData, router: AppRouterInstance, setData: Dispatch<SetStateAction<TData>>, setSucessMessage: Dispatch<SetStateAction<boolean>>, setLoading: Dispatch<SetStateAction<boolean>>) {
    event.preventDefault()
    const emptyMessage = data.message.trimEnd().trim().trimStart().length
    if (emptyMessage === 0) {
        const confirmSendMessage = confirm("Você tem certeza que deseja enviar o comando de emergência sem nenhuma mensagem?")

        if (!confirmSendMessage) {
            return
        }
    }

    setLoading(true)
    const sucess = await axios.post(`${process.env.BACKEND_URL}/criarmensagem`, data)
    console.log(sucess.status)
    if (sucess.status === 201) {
        setLoading(false)
        setSucessMessage(true)
        setData({ ...data, message: "" })
        router.refresh()
    }
}

export default function SOSButton({ userId }: { userId: number | undefined }) {
    const [sucessMessage, setSucessMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<TData>({
        userId,
        message: ""
    })
    const router = useRouter()

    if (sucessMessage) {
        setTimeout(() => {
            setSucessMessage(false)
        }, 5000)
    }

    return (
        <div className="relative">
            <form className="flex flex-col justify-center  mt-10" onSubmit={(event) => handleForm(event, data, router, setData, setSucessMessage, setLoading)}>
                <label htmlFor="name" className="text-sm mb-2 font-bold">Mensagem de Emergência:</label>
                <input
                    className="p-2 pl-4 bg-[#f5c87c31] text-sm placeholder-[#0b0b0b] rounded-xl disabled:opacity-50 text-black"
                    type="text"
                    id="name"
                    placeholder="Escreva sua mensagem de emergência"
                    onChange={(event) => { setData({ ...data, message: event.target.value }) }}
                    value={data.message}
                />


                <button className={`p-2 mt-4 text-sm rounded-lg bg-red-500 font-bold text-white disabled:opacity-50 ${sucessMessage && "hidden"}`} disabled={loading}>EMERGÊNCIA</button>
                <button className={`p-2 mt-4 text-sm  rounded-lg bg-green-500 font-bold text-white ${!sucessMessage && "hidden"}`} >Mensagem enviada</button>
            </form>
        </div>

    )
}