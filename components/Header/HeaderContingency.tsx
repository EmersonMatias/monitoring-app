'use client'
import { FindManyContingency, useFindManyContingency } from "@/hooks/hooks-contingency";
import HeaderLink from "./HeaderLink";
import { HeaderLinkContingency } from "./constants";
import { contingencyNotifications, emergencyContingencyAlert } from "./functions";
import { useRef } from "react";

export default function HeaderContingency() {
    const { data: contingencies, isSuccess, isRefetching } = useFindManyContingency()
    const contingenciesRef = useRef<FindManyContingency[]>()

    const notifications = contingencyNotifications(isSuccess, contingencies)

    emergencyContingencyAlert({ isSuccess, contingencies, contingenciesRef })

    return (
        <HeaderLink href={HeaderLinkContingency.href} svg={HeaderLinkContingency.svg} notifications={notifications} name="CONTINGÊNCIA" />
    )
}