'use client'
import { useGetAllContingency } from "@/hooks/hooks-contingency";
import HeaderLink from "./HeaderLink";
import { HeaderLinkContingency } from "./constants";
import { contingencyNotifications, emergencyContingencyAlert } from "./functions";
import { useRef } from "react";

export default function HeaderContingency() {
    const { data: contingencies, isSuccess, isRefetching } = useGetAllContingency()
    const contingenciesRef = useRef<TContigency[]>()

    const notifications = contingencyNotifications(isSuccess, contingencies)

    emergencyContingencyAlert({ isSuccess, contingencies, contingenciesRef })

    return (
        <HeaderLink href={HeaderLinkContingency.href} svg={HeaderLinkContingency.svg} notifications={notifications} name="CONTINGÊNCIA" />
    )
}