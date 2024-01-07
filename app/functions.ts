import { redirect } from "next/navigation"
import { logged } from "./utils/functions"

export function redirectToInicio() {
    const { token, accountType } = logged()

    if (token && accountType === "admin") {
        return redirect("inicio")
    } else if (token && accountType === "user") {
        return redirect("vigilante")
    }
}

