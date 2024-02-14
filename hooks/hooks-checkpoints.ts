import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { UseFormReset } from "react-hook-form"

export function useFindManyCheckpoints({ date }: { date?: string }) {
  const dateKey = date && 'dateParam'
  const dateQuery = date !== undefined ? `date=${date}` : ''

  return useQuery({
    queryKey: ["checkpoints", dateKey],
    queryFn: async () => {
      const data: AxiosResponse<Checkpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints?${dateQuery}`)

      return data.data
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true
  })
}

export function useGetCheckpoint(userId: number, createAllCheckpoints: UseMutateFunction<any, Error, void, unknown>) {
  return useQuery({
    queryKey: ['checkpoint', `${userId}`],
    queryFn: async () => {
      const data: AxiosResponse<TUserCheckpoints> = await axios.get(`${process.env.BACKEND_URL}/checkpoint/${userId}`)

      if (!data?.data) {
        createAllCheckpoints()
      }

      return data.data
    }
  })
}

export function useCreateAllCheckpoints() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post(`${process.env.BACKEND_URL}/checkpoints`)
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

export function useCreateCheckpoint(resetForm: UseFormReset<TCreateCheckpointForm>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ date, userId }: CreateCheckpoint) => {

      const response = await axios.post(`${process.env.BACKEND_URL}/checkpoints/${userId}`, { date })
      return response.data
    },
    onSuccess: () => {
      resetForm()
    }
  })
}

export function useUpdateCheckpoint() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (checkpointId: number | undefined) => {
      const response: AxiosResponse<TUserCheckpoints> = await axios.put(`${process.env.BACKEND_URL}/checkpoint/${checkpointId}`)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checkpoint', `${data.userId}`] })
    }
  })
}