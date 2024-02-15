'use client'
import { FindAllStatusResponse, useFindManyStatus } from "@/hooks/hooks-status";
import HeaderLink from "./HeaderLink";
import { HeaderLinkStatus } from "./constants";
import { useRef } from "react";
import { panicStatusAlert } from "./functions";

export default function HeaderStatus() {
    const { data: status, isSuccess } = useFindManyStatus()
    const notifications = status?.filter((oneStatus) => oneStatus.situation === "PANIC").length
    const statusRef = useRef<FindAllStatusResponse[]>()

    panicStatusAlert({ isSuccess, status, statusRef })

    return (
        <HeaderLink href={HeaderLinkStatus.href} svg={HeaderLinkStatus.svg} notifications={notifications} name="VIGILANTES STATUS"/>
    )
}