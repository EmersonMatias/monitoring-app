'use client'
import Input from "@/components/Input.component";
import { useCreateMessage } from "@/hooks/hooks-messages";
import { useForm } from "react-hook-form";
import { resetMutation, onSubmitNewMessage } from "./functions";

export default function EmergencyMessage() {
    const { mutate: createMessage, isSuccess: messageCreated, isPending, reset } = useCreateMessage()
    const { register, handleSubmit, formState: { errors }, resetField } = useForm<FormNewMessage>()

    resetMutation(messageCreated, reset)
  
    return (
        <div>
            {
                <form className="flex flex-col justify-center  mt-10" onSubmit={handleSubmit((data) => onSubmitNewMessage({data,resetField, createMessage}))}>
                    <Input
                        id="message"
                        name="message"
                        label="Mensagem de Emergência"
                        register={register}
                        type="text"
                        minLength={{
                            message: "Digite ao menos 10 letras",
                            value: 10
                        }}
                        placeholder="Digite a mensagem que deseja."
                    />
                    {errors.message && <p className="mt-2 pl-2 font-bold text-red-600">{errors.message.message}</p>}

                    <button className={`p-2 mt-4 text-sm rounded-lg bg-red-500 font-bold text-white disabled:opacity-50 ${messageCreated && "hidden"}`} disabled={isPending}>EMERGÊNCIA</button>
                    <button className={`p-2 mt-4 text-sm  rounded-lg bg-green-500 font-bold text-white ${!messageCreated && "hidden"}`} >Mensagem enviada</button>
                </form>}
        </div>
    )
}