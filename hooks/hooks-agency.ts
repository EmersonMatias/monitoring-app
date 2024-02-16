import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { UseFormReset } from "react-hook-form";

export function useCreateAgency(resetForm: UseFormReset<CreateAgencyForm>) {
    return useMutation({
        mutationFn: async ({ name }: CreateAgencyForm) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/agency`, { name })
            return response.data
        },
        onSuccess: () => {
            resetForm()
        }
    })
}

export function useFindManyAgency() {
    return useQuery({
        queryKey: ["agency"],
        queryFn: async () => {
            const data: AxiosResponse<Agency[]> = await axios.get(`${process.env.BACKEND_URL}/agency`)

            return data.data
        }
    })
}

export function useFindUniqueAgencyFilter(id: string, initialDate?: string, finalDate?: string) {
    const initialDataString = initialDate !== undefined ? `initialDate=${initialDate}&` : ''
    const finalDateString = finalDate !== undefined ? `finalDate=${finalDate}` : ''

    console.log(initialDataString.length)

    return useQuery({
        queryKey: ['agency', 'filter', `${id}`],
        queryFn: async () => {
            const data: AxiosResponse<FindUniqueAgencyFilterResponse> = await axios.get(`${process.env.BACKEND_URL}/agency/datefilter/${id}?${initialDataString}${finalDateString}`)
            return data.data
        },
        refetchOnMount: true,
        enabled: initialDate?.length !== 0
    })
}

interface FindUniqueAgencyFilterResponse {
    name: string
    Messages: {
        id: number;
        dateTime: Date;
        message: string;
        response: string;
        viewed: boolean;
        user: {
            name: string;
            entryTime: Date;
            departureTime: Date;
        };
    }[]
    Checkpoint: {
        id: number;
        date: Date;
        arrived: boolean;
        arrivalTime: Date | null;
        user: {
            name: string;
            entryTime: Date;
            departureTime: Date;
        };
    }[]

}