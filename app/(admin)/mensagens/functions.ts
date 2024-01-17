import { UseMutateFunction } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

export async function onSubmitFormMessage(data: FormMessageProps, messageId: number, setMessageViewed: UseMutateFunction<AxiosResponse<any, any>, Error, TMessageViewed, unknown>) {
    const responseData = {
        messageId,
        response: data.comment
    }
    
    setMessageViewed(responseData)
}
