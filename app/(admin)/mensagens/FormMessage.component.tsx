'use client'
import Input from "@/components/Input.component"
import { useUpdateMessage } from "@/hooks/hooks-messages"
import { useForm } from "react-hook-form"
import { onSubmitFormMessage } from "./functions"

export default function FormMessage({ messageId }: { readonly messageId: number }) {
    const { mutate: setMessageViewed, isPending } = useUpdateMessage()
    const { register, handleSubmit, formState: { errors } } = useForm<FormCommentMessage>()

    return (
        <form className="flex flex-col" onSubmit={handleSubmit((data) => onSubmitFormMessage(data, messageId, setMessageViewed))}>
            <Input
                type="text"
                id="comment"
                name="comment"
                register={register}
                label="Comentário da mensagem"
                minLength={{
                    message: "Digite um comentário de no mínimo 10 letras",
                    value: 10
                }}
                placeholder="Digite o comentário da mensagem"
            />
            {errors.comment && <p className="mt-2 pl-2 font-bold text-red-600">{errors.comment.message}</p>}

            <div className="flex justify-center">
                <button className="bg-red-400 p-4 mt-6 font-bold text-white rounded-md disabled:opacity-50" disabled={isPending}>{isPending ? "Salvando comentário..." : "Salvar comentário"}</button>
            </div>
        </form>
    )
}

