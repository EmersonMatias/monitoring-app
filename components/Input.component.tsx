import { HTMLInputTypeAttribute } from "react"
import { UseFormRegister } from "react-hook-form"

type InputProps = {
    readonly type: HTMLInputTypeAttribute | undefined,
    readonly id: string,
    readonly name: string,
    readonly register: UseFormRegister<any>,
    readonly label: string
    readonly validate?: () => string,
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
}

export default function Input({ register, type, id, label, validate, required, minLength, maxLength, name, placeholder }: InputProps) {

    return (
        <div className="flex flex-col mt-2">
            <label className="text-xl mb-2 font-bold" htmlFor={id}>{label}</label>
            <input id={id}
                className="pl-4 py-2 bg-[#ffffff] rounded-xl disabled:opacity-50"
                type={type}
                placeholder={placeholder}
                {...register(name, {
                    required: required,
                    minLength,
                    maxLength,
                    validate
                })} />
        </div>
    )
}