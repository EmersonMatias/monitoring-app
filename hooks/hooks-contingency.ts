import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export function useActivateContingency() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (activeContingencyData: TActivateContingencyData) => {
            const response = axios.post(`${process.env.BACKEND_URL}/contingency/activate`, activeContingencyData)
            return (await response).data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contingencyID"] })
        }
    })
}

export function useDeactivateContingency() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (deactivateContingencyData: TDeactivateContingencyData) => {
            const response = axios.post(`${process.env.BACKEND_URL}/contingency/deactivate`, deactivateContingencyData)
            return (await response).data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contingencyID"] })
        }
    })
}

export function useCheckpointContingency() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (checkpointContingencyData: TCheckpointContingencyData) => {
            const response = axios.post(`${process.env.BACKEND_URL}/contingency/checkpoint`, checkpointContingencyData)
            return (await response).data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contingencyID"] })
        }
    })
}

export function useGetAllContingency() {
    return useQuery({
        queryKey: ["contingency"],
        queryFn: async () => {
            const sucess: AxiosResponse<TContigency[]> = await axios.get(`${process.env.BACKEND_URL}/contingency/getall`)
            return sucess.data
        },
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}

export function useGetByUserIDContingency(userId: number) {
    return useQuery({
        queryKey: ["contingencyID"],
        queryFn: async () => {
            const sucess: AxiosResponse<TContigency> = await axios.get(`${process.env.BACKEND_URL}/contingency/getbyuserid=${userId}`)
            return sucess.data
        },
        enabled: userId !== undefined || userId !== null,
        refetchInterval: 3000,
        refetchIntervalInBackground: true
    })
}