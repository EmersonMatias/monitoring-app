import { ComponentProps } from "react"

type H1Props = ComponentProps<'h1'>

export default function H1({ ...props }: H1Props) {
    return (
        <h1 className="text-center text-3xl font-bold  mb-10 "   {...props}/>
    )
}