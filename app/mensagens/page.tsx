'use client'
import { useEffect, useState } from "react";
import Header from "../inicio/components/Header.component";
import axios, { AxiosResponse } from "axios";
import FormMessage from "./FormMessage.component";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

type TMessage = {
    id: number,
    date: string,
    hour: string,
    message: string,
    response: string,
    viewed: boolean,
    user: {
        name: string,
        agency: string
    }
}

export default function Mensagens() {
    const [messages, setMessages] = useState<TMessage[]>()
    const token = Cookies.get("token")
    const router = useRouter()

    useEffect(() => {
        const getMessages = async () => {
            try {
                const messagesData: AxiosResponse<TMessage[]> = await axios.get(`${process.env.BACKEND_URL}/mensagens`)
                console.log(messagesData.data)
                return setMessages(messagesData.data)
            } catch (error) {
                console.log(error)
            }
        }
 
        if(token === undefined){
            return router.push("/")
        }

        getMessages()

        const intervalId = setInterval(async () => {
            await getMessages()
  
          }, 3000)
          return () => clearInterval(intervalId);
  

    }, [router, token])

    return (
        <>
            <Header />
            <main className="flex mt-10 justify-center  ">
                <div className="bg-white w-1/2 border-[2px] rounded-2xl p-5">
                    <h2 className='text-4xl text-center mb-10 font-bold text-[#0B0B0B]'>Mensagens</h2>

                    {messages?.map((message) => (
                        <div key={message.id} className="text-left flex flex-col gap-2 pl-10 mt-4 p-4 bg-[#ECECEC] rounded-md">
                            <p><span className="font-bold">Vigilante:</span> {message?.user?.name}</p>

                            <p><span className="font-bold">Agência:</span> {message?.user?.agency}</p>

                            <p><span className="font-bold">Dia:</span> {message?.date}</p>

                            <p><span className="font-bold">Horário:</span> {message?.hour}</p>

                            <p><span className="font-bold">Mensagem:</span> {message?.message}</p>

                            {message?.viewed ?
                                <p><span className="font-bold">Tratamento da mensagem:</span> <span className="">{message.response}</span></p> :
                               <FormMessage messageId={message.id}/>
                            }


                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}