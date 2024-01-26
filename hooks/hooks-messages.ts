import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useFindAllMessages() {
    return useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const data: AxiosResponse<TMessage[]> = await axios.get(`${process.env.BACKEND_URL}/messages`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useSetMessageViewed() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (responseData: TMessageViewed) => {

            const sucess = await axios.put(`${process.env.BACKEND_URL}/visualizarmensagem`, responseData)
            return sucess
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
    })
}

export function useCreateMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: TCreateMessageData) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/criarmensagem`, data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
    })
}