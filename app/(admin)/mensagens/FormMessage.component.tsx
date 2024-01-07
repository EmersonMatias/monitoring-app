'use client'
import { useSetMessageViewed } from "@/hooks/hooks-messages"
import { FormEvent, useState } from "react"

export default function FormMessage({ messageId }: { messageId: number }) {
    const [responseData, setResponseData] = useState<TMessageViewed>({
        messageId, response: ""
    })

    const { mutate: setMessageViewed, isPending } = useSetMessageViewed()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setMessageViewed(responseData)
    }


    return (
        <form className="flex flex-col" onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="name" className="text-xl mb-2 font-bold">Tratamento de Mensagem:</label>
            <input
                type="text"
                className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
                id="name"
                placeholder="Faça o tratamento da mensagem"
                required
                onChange={(event) => setResponseData({ ...responseData, response: event.target.value })}
                minLength={10}
            />

            <div className="flex justify-center">
                <button className="bg-red-400 p-4 font-bold text-white rounded-md disabled:opacity-50" disabled={isPending}>Visualizar mensagem</button>
            </div>
        </form>
    )
}