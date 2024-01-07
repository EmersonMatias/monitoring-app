'use client'
import axios from "axios"
import { TUserCheckpoints } from "../requests"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

async function handleButton(checkpoint: TUserCheckpoints | undefined, router: AppRouterInstance) {
    const checkpointId = checkpoint?.id
    const sucess = await axios.put(`${process.env.BACKEND_URL}/checkpoint`, { checkpointId })
    console.log(sucess)

    if (sucess.status === 200) {
        location.reload()
        router.refresh()
    }
}

export default function Button({ checkpoint }: { checkpoint: TUserCheckpoints | undefined }) {
    const router = useRouter()

    return (
        <div className="flex justify-center mt-10">
            {checkpoint?.arrived ?
                <div className="bg-green-500 py-4 px-8 rounded-lg font-bold text-white">Checkpoint do dia realizado!</div> :
                <button className="bg-blue-600 py-4 px-8 rounded-lg cursor-pointer font-bold text-white" onClick={() => handleButton(checkpoint, router)}>Fazer Checkpoint</button>
            }
        </div>
    )
}