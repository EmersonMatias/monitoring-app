import { UseMutateFunction } from "@tanstack/react-query"

export function handleDeleteVigilant(id: number, deleteVigilant: UseMutateFunction<any, Error, number, unknown>) {
    const confirmDelete = confirm("Você tem certeza que deseja excluir esse vigilante?")

    if (confirmDelete) {
        deleteVigilant(id)
    }
}