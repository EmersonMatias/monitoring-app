import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { UseFormReset } from "react-hook-form"

export function useCreateVigilant(resetForm: UseFormReset<TCreateUser>) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (createVigilantData: TCreateUser) => {
            const [year, month, day] = createVigilantData.dateofbirth.split("-")
            const signupData = { ...createVigilantData, dateofbirth: `${day}/${month}/${year}`, accountType: "user", frequency: Number(createVigilantData.frequency) }
            const sucess = (await axios.post(`${process.env.BACKEND_URL}/cadastrar`, signupData))
            return sucess
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vigilantes"] })
            resetForm()
        }
    })
}

export function useFindAllVigilants() {
    return useQuery({
        queryKey: ["vigilants"],
        queryFn: async () => {
            const data: AxiosResponse<TVigilant[]> = await axios.get(`${process.env.BACKEND_URL}/vigilants`)
            return data.data
        },
        refetchOnMount: true
    })
}

export function useFindOneVigilant(id: number) {
    return useQuery({
        queryKey: ["vigilant", `${id}`],
        queryFn: async () => {
            const data: AxiosResponse<TVigilant2> = await axios.get(`${process.env.BACKEND_URL}/vigilants/${id}`)
            return data.data
        },
        refetchOnMount: true,
    })
}

export function useUpdateVigilant() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (updateVigilantData: TUpdateUser & { id: number }) => {
            const [year, month, day] = updateVigilantData.dateofbirth.split("-")

            const response = await axios.post(`${process.env.BACKEND_URL}/vigilants/${updateVigilantData.id}`, { ...updateVigilantData, dateofbirth: `${day}/${month}/${year}` })
            console.log(response)
            return response.data
        },
        onSuccess: (_, updateVigilantData) => {
            queryClient.invalidateQueries({queryKey: ["vigilant", `${updateVigilantData.id}`]})
        }   
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

