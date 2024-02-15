import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useUpdateStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({id, situation}: {situation: "OK" | "PANIC", id: number}) => {
            const response = await axios.put(`${process.env.BACKEND_URL}/status/${id}`, { situation })
            console.log(response)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["status"] })
        }
    })
}

export function useFindUniqueStatus(userId: number){
    return useQuery({
        queryKey: ["status", `${userId}`],
        queryFn: async () => {
            const data: AxiosResponse<Status> = await axios.get(`${process.env.BACKEND_URL}/status/${userId}`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}


export function useFindManyStatus() {
    return useQuery({
        queryKey: ["status"],
        queryFn: async () => {
            const data: AxiosResponse<FindAllStatusResponse[]> = await axios.get(`${process.env.BACKEND_URL}/status`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}


export type FindAllStatusResponse =  {
    id: number,
    frequency: number,
    situation: "OK" | "PANIC",
    timestamp: Date,
    user: {
      id: number,
      name: string,
      entryTime: Date,
      departureTime: Date,
      agency: {
        id: number,
        name: string
      }
    }
}