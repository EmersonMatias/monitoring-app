import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useGetAllCheckpoints() {
  return useQuery({
    queryKey: ["checkpoints"],
    queryFn: async () => {
      const data: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)

      return data.data
    },
    refetchOnMount: true,

  })
}

export function useGetAllTodayCheckpoint(createAllCheckpoints: UseMutateFunction<any, Error, void, unknown>) {
  return useQuery({
    queryKey: ["checkpoints-today"],
    queryFn: async () => {
      const data: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints=today`)

      if(data.data.length === 0){
        createAllCheckpoints()
      }

      return data.data
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true
  })
}

export function useCreateAllCheckpoints() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${process.env.BACKEND_URL}/checkpoints/createall`)
      console.log(response)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usercheckpoints", "checkpoints-today"] })
    },
    onError: () => {
      console.log("FALHA AO CRIAR CHECKPOINTS")
    }
  })
}