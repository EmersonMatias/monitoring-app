'use client'
import FormEditVigilant from "./components/FormEditVigilant"
import { useFindOneVigilant } from "@/hooks/hooks-vigilants"
import { useFindAllAgency } from "@/hooks/hooks-agency"
import H1 from "@/components/H1.component"

export default function EditVigilant({ params }: { readonly params: { id: string } }) {
    const { data: vigilant, isSuccess } = useFindOneVigilant(Number(params.id))
    const { data: agencies, isSuccess: isSuccessAgency } = useFindAllAgency()

    return (
        <div className="flex  flex-col items-center py-10">
            <H1>Editar Vigilante</H1>

            {(isSuccess && isSuccessAgency) && <FormEditVigilant agencies={agencies} vigilant={vigilant} id={Number(params.id)} />}
        </div>
    )
}
