'use client'
import styles from "../../(admin)/criarvigilante/styles.module.css"
import { useFindAllAlerts, useUpdateAlert } from "@/hooks/hooks-alert"
import { useState } from "react"

export default function HeaderAlerts() {
    const { data: alerts, isSuccess, isPending} = useFindAllAlerts()
    const { mutate: updateAlert } = useUpdateAlert()
    const [visible, setVisible] = useState(true)

    const notifications = alerts?.filter((alert) => alert?.viewed === false).length

    function handleOK(id: number) {
        updateAlert(id)
    }

    return (
        <div className="relative flex flex-col items-center">
            <div className={`text-white rounded-full w-[30px] h-[30px] flex justify-center items-center font-bold bg-red-500 absolute left-[-10px] top-[-10px] bg-opacity-80 ${notifications === 0 ? 'hidden' : null} `}>
                {notifications}
            </div>

            <div hidden={visible} className={`absolute top-[70px] right-[-160px] bg-white w-[400px] h-[150px] rounded-lg p-5 overflow-y-scroll ${styles.scrollable}`}>
                {isSuccess && alerts?.map((alert) => (
                    alert?.viewed === false &&
                    <div key={alert.id} className=" h-fit flex items-center mb-2 bg-zinc-200 rounded-md p-2">
                        Confirmar notificação de atraso de {alert?.name}: <button className="bg-green-400 text-white font-bold p-2 ml-2 rounded cursor-pointer" onClick={() => handleOK(alert.id)}>OK</button>
                    </div>
                ))}
            </div>

            <svg onClick={() => setVisible(!visible)} className="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4.214 3.227a.75.75 0 00-1.156-.956 8.97 8.97 0 00-1.856 3.826.75.75 0 001.466.316 7.47 7.47 0 011.546-3.186zM16.942 2.271a.75.75 0 00-1.157.956 7.47 7.47 0 011.547 3.186.75.75 0 001.466-.316 8.971 8.971 0 00-1.856-3.826z"></path><path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.94 32.94 0 003.256.508 3.5 3.5 0 006.972 0 32.933 32.933 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zm0 14.5a2 2 0 01-1.95-1.557 33.54 33.54 0 003.9 0A2 2 0 0110 16.5z" clipRule="evenodd"></path>
            </svg>
            <p className="mt-2 font-bold text-white text-sm">ALERTAS</p>
        </div>
    )
}