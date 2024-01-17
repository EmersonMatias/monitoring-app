import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useUpdateStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (updateStatusData: TUpdateStatus) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/status/updatebyid=${updateStatusData.statusID}`, { newStatus: updateStatusData.newStatus })
            console.log(response)
            return response
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["status"] })
        }
    })
}

export function useGetAllStatus() {
    return useQuery({
        queryKey: ["status"],
        queryFn: async () => {
            const data: AxiosResponse<TStatusWithUser[]> = await axios.get(`${process.env.BACKEND_URL}/status/getall`)
            return data.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}