import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useCreateAlert() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (name: string | undefined) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/alert/create`, { name })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] })
        }
    })
}

export function useUpdateAlert() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/alert/update=${id}`)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["alerts"] })
        }
    })
}

export function useFindAllAlerts() {
    return useQuery({
        queryKey: ["alerts"],
        queryFn: async () => {
            const data: AxiosResponse<TAlerts[]> = await axios.get(`${process.env.BACKEND_URL}/alert/findall`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}