import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";


export function useFindManyContingency() {
    return useQuery({
        queryKey: ["contingency"],
        queryFn: async () => {
            const sucess: AxiosResponse<FindManyContingency[]> = await axios.get(`${process.env.BACKEND_URL}/contingency`)
            return sucess.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useFindUniqueContingency(userId: number) {
    return useQuery({
        queryKey: ["contingency", `${userId}`],
        queryFn: async () => {
            const sucess: AxiosResponse<FindManyContingency> = await axios.get(`${process.env.BACKEND_URL}/contingency/${userId}`)
            return sucess.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useUpdateContingency() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ userId, active, situation, frequency }: { userId: number, situation: "OK" | "PANIC", active: boolean, frequency?: number }) => {
            const response = axios.post(`${process.env.BACKEND_URL}/contingency/${userId}`, { situation, active, frequency })
            return (await response).data
        },
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["contingency", `${userId}`] })
        }
    })
}

//********************** */
export function useCheckpointContingency() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (checkpointContingencyData: TCheckpointContingencyData) => {
            const response = axios.post(`${process.env.BACKEND_URL}/contingency/checkpoint`, checkpointContingencyData)
            return (await response).data
        }
    })
}




export interface FindManyContingency {
    id: number,
    active: boolean,
    frequency: number,
    situation: "OK" | "PANIC",
    timestamp: Date,
    user: {
        name: string,
        agency: {
            id: number,
            name: string
        }
    }
}