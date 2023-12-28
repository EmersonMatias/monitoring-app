'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function VigilantHeader() {
    const router = useRouter()

    function handleExit(){
        Cookies.remove("name"),
        Cookies.remove("token"),
        Cookies.remove("entryTime")
        router.push("login")
        router.refresh()
    }
    
    return (
        <div className="flex justify-center">
            <h1 className="text-4xl font-bold text-center py-4">Checkpoint</h1>
            <button className="absolute top-5 right-5 bg-red-500 p-2 font-bold rounded" onClick={() => handleExit()}>Sair</button>
        </div>
    )
}