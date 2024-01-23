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

export function useGetAllVigilants() {
    return useQuery({
        queryKey: ["vigilantes"],
        queryFn: async () => {
            const data: AxiosResponse<TVigilant[]> = await axios.get(`${process.env.BACKEND_URL}/vigilants`)
            return data.data
        },
        refetchOnMount: true
    })
}

export function useDeleteVigilant() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number) => {
            const sucess = await axios.delete(`${process.env.BACKEND_URL}/vigilants/${id}`)
            return sucess
        },
        onSuccess: () => {
            alert("Usuário deletado com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["vigilantes"] })
        }
    })
}