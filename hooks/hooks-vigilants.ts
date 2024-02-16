import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { UseFormReset } from "react-hook-form"

export function useFindManyVigilants() {
    return useQuery({
        queryKey: ["vigilants"],
        queryFn: async () => {
            const data: AxiosResponse<Vigilants[]> = await axios.get(`${process.env.BACKEND_URL}/vigilants`)
            return data.data
        },
        refetchOnMount: true
    })
}

export function useFindUniqueVigilant(id: number) {

    return useQuery({
        queryKey: ["vigilant", `${id}`],
        queryFn: async () => {
            const data: AxiosResponse<Vigilant> = await axios.get(`${process.env.BACKEND_URL}/vigilants/${id}`)
            return data.data
        },
        refetchOnMount: true,
    })
}

export function useDeleteVigilant() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            const sucess = await axios.delete(`${process.env.BACKEND_URL}/vigilants/${id}`)
            return sucess.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vigilants"] })
        }
    })
}

export function useCreateVigilant(resetForm: UseFormReset<CreateVigilantForm>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: VigilantBody) => {

            const sucess = (await axios.post(`${process.env.BACKEND_URL}/vigilants`, data))
            return sucess
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vigilantes"] })
            resetForm()
        }
    })
}

export function useUpdateVigilant(id: number) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: UpdateVigilantBody) => {
            const response = await axios.put(`${process.env.BACKEND_URL}/vigilants/${id}`, data)
            console.log(response)
            return response.data
        },
        onSuccess: (_, updateVigilantData) => {
            queryClient.invalidateQueries({ queryKey: ["vigilant", `${id}`] })
        }
    })
}

export function useFindUniqueVigilantFilter(id: string, initialDate?: string, finalDate?: string) {
    const initialDataString = initialDate !== undefined ? `initialDate=${initialDate}&` : ''
    const finalDateString = finalDate !== undefined ? `finalDate=${finalDate}` : ''
    console.log(`${process.env.BACKEND_URL}/vigilants/datefilter/${id}?${initialDataString}${finalDateString}`)

    return useQuery({
        queryKey: ['vigilant', 'filter', `${id}`],
        queryFn: async () => {
            const data: AxiosResponse<FindUniqueVigilantFilterResponse> = await axios.get(`${process.env.BACKEND_URL}/vigilants/datefilter/${id}?${initialDataString}${finalDateString}`)
            return data.data
        },
        refetchOnMount: true,
        enabled: initialDate?.length !== 0
    })
}

interface FindUniqueVigilantFilterResponse {
    name: string;
    entryTime: Date;
    departureTime: Date;
    agency: Agency;
    checkpoint: {
        id: number;
        date: Date;
        agency: Agency;
        arrived: boolean;
        arrivalTime: Date | null;
    }[]
    messages: {
        id: number;
        message: string;
        dateTime: Date;
        viewed: boolean;
        response: string;
        agency: Agency;
    }[]
}



