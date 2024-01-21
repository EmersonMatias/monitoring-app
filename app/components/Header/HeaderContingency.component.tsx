'use client'
import { useGetAllContingency } from "@/hooks/hooks-contingency";
import HeaderLink from "./HeaderLink.component";
import { HeaderLinkContingency } from "./constants";
import { contingencyNotifications } from "./functions";

export default function HeaderContingency() {
    const { data: contingencies, isSuccess } = useGetAllContingency()

    const notifications = contingencyNotifications(isSuccess, contingencies)

    return (
        <HeaderLink href={HeaderLinkContingency.href} svg={HeaderLinkContingency.svg} notifications={notifications} />
    )
}