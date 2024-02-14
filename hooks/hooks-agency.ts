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

export function useFindManyAgency(){
    return useQuery({
        queryKey: ["agency"],
        queryFn: async () => {
            const data: AxiosResponse<Agency[]> = await axios.get(`${process.env.BACKEND_URL}/agency`)

            return data.data
        }
    })
}