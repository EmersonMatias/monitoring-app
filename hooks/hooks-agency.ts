import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { UseFormReset } from "react-hook-form";

export function useCreateAgency(resetForm: UseFormReset<TCreateAgency>) {
    return useMutation({
        mutationFn: async ({ name }: TCreateAgency) => {
            const response = await axios.post(`${process.env.BACKEND_URL}/agency`, { name })
            return response.data
        },
        onSuccess: () => {
            resetForm()
        }
    })
}

export function useFindAllAgency(){
    return useQuery({
        queryKey: ["agency"],
        queryFn: async () => {
            const data: AxiosResponse<TAgency[]> = await axios.get(`${process.env.BACKEND_URL}/agency`)

            return data.data
        }
    })
}