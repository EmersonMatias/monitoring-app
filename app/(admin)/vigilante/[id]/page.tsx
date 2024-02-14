'use client'
import { useFindUniqueVigilant } from "@/hooks/hooks-vigilants"
import { useFindManyAgency } from "@/hooks/hooks-agency"
import H1 from "@/components/H1.component"
import FormEditVigilant from "./FormEditVigilant"

export default function EditVigilant({ params }: { readonly params: { id: string } }) {
    const id = Number(params.id)
    const { data: vigilant, isSuccess } = useFindUniqueVigilant(id)
    const { data: agencies, isSuccess: isSuccessAgency } = useFindManyAgency()

    return (
        <div className="flex  flex-col items-center py-10">
            <H1>Editar Vigilante</H1>

            {(isSuccess && isSuccessAgency) && <FormEditVigilant agencies={agencies} vigilant={vigilant} id={Number(params.id)} />}
        </div>
    )
}
