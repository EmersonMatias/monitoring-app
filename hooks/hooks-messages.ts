import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useGetAllMessages(){
    return useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const data: AxiosResponse<TMessage[]> = await axios.get(`${process.env.BACKEND_URL}/mensagens`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useSetMessageViewed(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (responseData: TMessageViewed) => {
            
            const sucess = await axios.put(`${process.env.BACKEND_URL}/visualizarmensagem`, responseData)
            return sucess
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["messages"]})

        }
    })
}