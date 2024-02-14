import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

type MessagesQueries = {
    agencyId: number,
    dayGte: string,
    dayLte: string,
    monthGte: string,
    monthLte: string,
    yearGte: string,
    yearLte: string,
}

export function useQueryMessages(queries?: MessagesQueries) {
    return useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const data: AxiosResponse<TMessage[]> = await axios.get(`${process.env.BACKEND_URL}/messages?agencyId=${queries?.agencyId}&dayGte=${queries?.dayGte}&dayLte=${queries?.dayLte}&monthGte=${queries?.monthGte}&monthLte=${queries?.monthLte}&yearGte=${queries?.yearGte}&yearLte=${queries?.yearLte}`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useUpdateMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (updateMessage: TUpdateMessage) => {

            const sucess = await axios.put(`${process.env.BACKEND_URL}/messages/${updateMessage.messageId}`, { response: updateMessage.response })
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
            const response = await axios.post(`${process.env.BACKEND_URL}/messages`, data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages"] })
        }
    })
}