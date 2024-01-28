'use client'

import { useUpdateCheckpoint } from "@/hooks/hooks-checkpoints"

export default function Button({ checkpoint }: { readonly checkpoint: TUserCheckpoints | undefined }) {
    const { mutate: updateCheckpoint } = useUpdateCheckpoint()
    const checkpointId = checkpoint?.id
    
    return (
        <div className="flex justify-center mt-4">
            {checkpoint?.arrived ?
                <div className="bg-green-500 p-2 rounded-lg font-bold text-white">Checkpoint do dia realizado!</div> :
                <button 
                className="bg-blue-600 p-2 rounded-lg cursor-pointer font-bold text-white"
                onClick={() => updateCheckpoint(checkpointId)}
                >Fazer Checkpoint</button>
            }
        </div>
    )
}