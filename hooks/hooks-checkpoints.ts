import { useQuery } from "@tanstack/react-query"
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

export function useGetAllTodayCheckpoint() {
  return useQuery({
    queryKey: ["checkpoints-today"],
    queryFn: async () => {
      const data: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints=today`)
      return data.data
    },
    refetchIntervalInBackground: true
  })
}