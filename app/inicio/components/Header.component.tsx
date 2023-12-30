"use client"
import Image from "next/image";
import Logo from "@/public/Logo.png"
import Link from "next/link";
import { handleExit } from "@/app/vigilante/components/VigilantHeader.component";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

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


export default function Header() {
    const router = useRouter()
    const [messages, setMessages] = useState<TMessage[]>()
    const unviewedMessages = messages?.filter((message) => message.viewed === false).length

    useEffect(() => {
        const getMessages = async () => {
            try {
                const messagesData: AxiosResponse<TMessage[]> = await axios.get(`${process.env.BACKEND_URL}/mensagens`)

                if (messagesData.status === 200) {
                    setMessages(messagesData.data)
                }

            } catch (error) {
                console.log(error)
            }
        }

        getMessages()

        const intervalId = setInterval(() => {
            getMessages()

        }, 5000)
        return () => clearInterval(intervalId);

    }, [])


    return (
        <header className="h-20 bg-[#f0a830] flex items-center justify-center w-[100%]">

            <div className="absolute left-20">
                <Image src={Logo} style={{ width: "auto", height: "48px" }} alt="Logo" />
            </div>

            <div className="flex gap-20">

                <Link href="estatistica">
                    <svg className="w-[40px] h-[40px] text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 544 512" >
                        <path d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path>
                    </svg>
                </Link>

                <Link href="inicio">
                    <svg className="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                </Link>

                <Link href="criarvigilante">
                    <svg className="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                    </svg>
                </Link>

                <Link href="https://ip.epavi360gps.com.br/login">
                    <svg className="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.351 3.063-8-3a1.009 1.009 0 0 0-.7 0l-8 3A1 1 0 0 0 0 4a19.394 19.394 0 0 0 8.47 15.848 1 1 0 0 0 1.06 0A19.394 19.394 0 0 0 18 4a1 1 0 0 0-.649-.937Zm-3.644 4.644-5 5A1 1 0 0 1 8 13c-.033 0-.065 0-.1-.005a1 1 0 0 1-.733-.44l-2-3a1 1 0 0 1 1.664-1.11l1.323 1.986 4.138-4.138a1 1 0 0 1 1.414 1.414h.001Z" />
                    </svg>
                </Link>
            </div>

            <div className="absolute right-20 flex gap-8">

                <Link href="mensagens">
                    <div className={`text-white rounded-full w-[30px] h-[30px] flex justify-center items-center font-bold bg-red-500 absolute left-[-10px] top-[-10px] bg-opacity-80 ${unviewedMessages === 0 && "hidden"}`}>
                        {unviewedMessages}
                    </div>

                    <svg className="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.214 3.227a.75.75 0 00-1.156-.956 8.97 8.97 0 00-1.856 3.826.75.75 0 001.466.316 7.47 7.47 0 011.546-3.186zM16.942 2.271a.75.75 0 00-1.157.956 7.47 7.47 0 011.547 3.186.75.75 0 001.466-.316 8.971 8.971 0 00-1.856-3.826z"></path><path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.94 32.94 0 003.256.508 3.5 3.5 0 006.972 0 32.933 32.933 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zm0 14.5a2 2 0 01-1.95-1.557 33.54 33.54 0 003.9 0A2 2 0 0110 16.5z" clipRule="evenodd"></path>
                    </svg>

                </Link>


                <button className=" bg-[#FC6F6F] p-2 font-bold rounded" onClick={() => { handleExit(router) }}>Sair</button>
            </div>

        </header>
    )
}