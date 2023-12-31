'use client'
import Cookies from "js-cookie"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"

export function handleExit(router: AppRouterInstance){
    Cookies.remove("name"),
    Cookies.remove("token"),
    Cookies.remove("entryTime")
    Cookies.remove("accountType")
    Cookies.remove("userId")
    router.push("/")
    router.refresh()
}

export default function VigilantHeader() {
    const router = useRouter()

    return (
        <div className="flex justify-center">
            <h1 className="text-xl font-bold text-center mt-4">Checkpoint</h1>
            <button className="absolute text-xs top-3 right-5 bg-red-500 p-2 font-bold rounded text-white" onClick={() => handleExit(router)}>Sair</button>
        </div>
    )
}