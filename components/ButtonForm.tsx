import { ComponentProps } from "react"

type ButtonFormProps = ComponentProps<'button'>

export default function ButtonForm({ ...props }: ButtonFormProps) {
    return (
        <button
            {...props}
            className="bg-[#f0a830] py-3 px-6 w-[300px] mt-5 text-lg font-semibold rounded-md text-white disabled:opacity-50 "
        />
    )
}