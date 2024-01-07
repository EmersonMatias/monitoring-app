import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { Dispatch, SetStateAction } from "react"

export function useCreateVigilant(
    createVigilantData: TCreateUser,
    initialData: TCreateUser,
    setCreateVigilantData: Dispatch<SetStateAction<TCreateUser>>,
    setSucessMessage: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<boolean>>) {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: async () => {
            const [year, month, day] = createVigilantData.dateofbirth.split("-")
            const signupData = { ...createVigilantData, dateofbirth: `${day}/${month}/${year}`, accountType: "user" }
            const sucess = (await axios.post(`${process.env.BACKEND_URL}/cadastrar`, signupData))
            return sucess
        },
        onSuccess: () => {

            setSucessMessage(true)
            setCreateVigilantData(initialData)
            queryClient.invalidateQueries({ queryKey: ["vigilantes"] })

        },
        onError: () => {
            setErrorMessage(true)
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