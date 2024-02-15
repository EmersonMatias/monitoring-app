import { UseMutateFunction } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

export async function onSubmitFormMessage(
    data: FormCommentMessage,
    messageId: number,
    setMessageViewed: UseMutateFunction<AxiosResponse<any, any>, Error, {
        updateMessage: UpdateMessage;
        messageId: number;
    }, unknown>
) {
    const updateMessage: UpdateMessage = {
        response: data.comment
    }

    setMessageViewed({ updateMessage, messageId })
}
