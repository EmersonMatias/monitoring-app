'use client'
import FormMessage from "./FormMessage.component";
import { useFindAllMessages } from "@/hooks/hooks-messages";

export default function Mensagens() {
    const { data: messages } = useFindAllMessages()

    return (
        <main className="flex mt-10 justify-center  ">
            <div className="bg-white w-1/2 border-[2px] rounded-2xl p-5">
                <h2 className='text-4xl text-center mb-10 font-bold text-[#0B0B0B]'>Mensagens</h2>

                {messages?.slice()?.reverse()?.map((message) => (
                    <div key={message.id} className="text-left flex flex-col gap-2 pl-10 mt-4 p-4 bg-[#ECECEC] rounded-md">
                        <p><span className="font-bold">Vigilante:</span> {message?.user?.name}</p>

                        <p><span className="font-bold">Agência:</span> {message?.user?.agency.name}</p>

                        <p><span className="font-bold">Dia: </span>
                            {message.day.toString().padStart(2, "0")}/
                            {message.month.toString().padStart(2, "0")}/
                            {message.year.toString().padStart(2, "0")}
                        </p>

                        <p><span className="font-bold">Horário:</span> {message?.hour}</p>

                        <p><span className="font-bold">Mensagem:</span> {message?.message}</p>

                        {message?.viewed ?
                            <p><span className="font-bold">Comentário:</span> <span className="">{message.response}</span></p> :
                            <FormMessage messageId={message.id} />
                        }
                    </div>
                ))}
            </div>
        </main>

    )
}