'use client'
import axios from "axios"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react"


type TData = {
    userId: number | undefined;
    message: string;
}

async function handleForm(event: FormEvent<HTMLFormElement>, data: TData, router:  AppRouterInstance, setData: Dispatch<SetStateAction<TData>>) {
    event.preventDefault()
    const sucess = await axios.post(`${process.env.BACKEND_URL}/criarmensagem`, data)
    console.log(sucess.status)
    if(sucess.status === 201){
        setData({...data, message: ""})
        router.refresh()
    }
}

export default function SOSButton({ userId }: { userId: number | undefined }) {

    const [data, setData] = useState<TData>({
        userId,
        message: ""
    })
    const router = useRouter()



    console.log(data)

    return (
        <form className="flex flex-col justify-center bg-white mt-20" onSubmit={(event) => handleForm(event, data, router, setData)}>
            <label htmlFor="name" className="text-lg mb-2 font-bold">Mensagem de Emergência:</label>
            <input
                className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-5 disabled:opacity-50"
                type="text"
                id="name"
                placeholder="Escreva sua mensagem de emergência"
                onChange={(event) => { setData({...data, message: event.target.value}) }}
                value={data.message}
            />
            <button className="py-4  px-16  rounded-lg bg-red-500 font-bold">EMERGÊNCIA</button>
        </form>
    )
}