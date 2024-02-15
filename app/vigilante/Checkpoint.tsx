'use client'
import { FindUniqueCheckpoint, useUpdateCheckpoint } from "@/hooks/hooks-checkpoints"

export default function Checkpoint({ checkpoint }: { readonly checkpoint: FindUniqueCheckpoint | undefined }) {
    const { mutate: updateCheckpoint, isPending } = useUpdateCheckpoint()
    const checkpointId = Number(checkpoint?.id)
    const date = new Date().toISOString()

    return (
        <div className="flex justify-center mt-4">
            {checkpoint?.arrived ?
                <div className="bg-green-500 p-2 rounded-lg font-bold text-white">Checkpoint do dia realizado!</div> :
                <button
                    className="bg-blue-600 p-2 rounded-lg cursor-pointer font-bold text-white disabled:opacity-50"
                    disabled={isPending}
                    onClick={() => updateCheckpoint({ checkpointId, date })}
                >Fazer Checkpoint</button>
            }
        </div>
    )
}