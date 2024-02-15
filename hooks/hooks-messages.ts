import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useFindManyMessages() {
    return useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const data: AxiosResponse<Message[]> = await axios.get(`${process.env.BACKEND_URL}/messages`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useCreateMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: CreateMessage) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/messages`, data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
    })
}


export function useUpdateMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ updateMessage, messageId }: { updateMessage: UpdateMessage, messageId: number }) => {

            const sucess = await axios.put(`${process.env.BACKEND_URL}/messages/${messageId}`, updateMessage)
            return sucess
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
    })
}
