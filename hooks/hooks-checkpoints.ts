import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export function useFindUniqueCheckpoint({ userId, date }: { userId: number, date: string }) {
  return useQuery({
    queryKey: ['checkpoint', `${userId}`],
    queryFn: async () => {
      const data: AxiosResponse<FindUniqueCheckpoint[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints/${userId}/${date}`)

      return data.data[0]
    }
  })
}

export function useCreateCheckpoint(resetForm: UseFormReset<CreateCheckpointForm>) {
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
    mutationFn: async ({ checkpointId, date }: { checkpointId: number, date: string }) => {

      const response = await axios.put(`${process.env.BACKEND_URL}/checkpoints/${checkpointId}`, { date })
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['checkpoint', `${data.userId}`] })
    }
  })
}


export type FindUniqueCheckpoint = {
  id: number,
  date: Date,
  arrived: boolean,
  arrivalTime: null | Date
}