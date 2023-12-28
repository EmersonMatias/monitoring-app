'use client'
import axios from "axios"
import { TUserCheckpoints } from "../requests"
import { useRouter } from "next/navigation"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

async function handleButton(checkpoint: TUserCheckpoints, router: AppRouterInstance) {
    const checkpointId = checkpoint.id
    const sucess = await axios.put(`${process.env.BACKEND_URL}/checkpoint`, { checkpointId })

    if (sucess.status === 200) {
        router.refresh()
    }
}

export default function Button({ checkpoint }: { checkpoint: TUserCheckpoints }) {
    const router = useRouter()

    return (
        <div className="flex justify-center mt-10">
            {checkpoint.arrived ?
                <div className="bg-green-500 py-4 px-8 rounded-lg">Checkpoint do dia realizado!</div> :
                <button className="bg-blue-600 py-4 px-8 rounded-lg cursor-pointer" onClick={() => handleButton(checkpoint, router)}>Fazer Checkpoint</button>
            }
        </div>
    )
}