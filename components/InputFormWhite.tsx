import { HTMLInputTypeAttribute } from "react"
import { UseFormRegister } from "react-hook-form"

type InputCreateVigilantProps = {
    readonly type: HTMLInputTypeAttribute | undefined,
    readonly id: string,
    readonly name: string,
    readonly register: UseFormRegister<any>,
    readonly label: string
    readonly validate?: (data: string) => string | undefined,
    readonly required?: string
    readonly minLength?: {
        message: string,
        value: number
    },
    readonly maxLength?: {
        message: string,
        value: number
    }
    readonly placeholder?: string
    readonly message?: string
    readonly isPending?: boolean
}

export default function InputFormWhite({ register,message,isPending, type, id, label, validate, required, minLength, maxLength, name, placeholder }: InputCreateVigilantProps) {

    return (
        <div className="flex flex-col mt-2">
            <label className="text-base mb-2 font-bold" htmlFor={id}>{label}</label>
            <input id={id}
                className="pl-4 py-2 bg-white rounded-xl mb-2 disabled:opacity-50 w-[500px]"
                type={type}
                disabled={isPending}
                placeholder={placeholder}
                {...register(name, {
                    required: required,
                    minLength,
                    maxLength,
                    validate
                })} />
            <p className="pl-2 font-bold text-red-600">{message}</p>
        </div>
    )
}