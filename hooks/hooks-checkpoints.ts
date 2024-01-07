import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export function useGetAllCheckpoints(){
    return useQuery({
        queryKey: ["checkpoints"],
        queryFn: async () => {
          const data: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)
    
          return data.data
        },
        refetchOnMount: true
      })
}