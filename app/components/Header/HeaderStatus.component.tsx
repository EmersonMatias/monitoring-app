'use client'
import { useGetAllStatus } from "@/hooks/hooks-status";
import HeaderLink from "./HeaderLink.component";
import { HeaderLinkStatus } from "./constants";
import { useRef } from "react";
import { panicStatusAlert } from "./functions";

export default function HeaderStatus() {
    const { data: status, isSuccess } = useGetAllStatus()
    const notifications = status?.filter((oneStatus) => oneStatus.status === "PANIC").length
    const statusRef = useRef<TStatusWithUser[]>()

    panicStatusAlert({ isSuccess, status, statusRef })

    return (
        <HeaderLink href={HeaderLinkStatus.href} svg={HeaderLinkStatus.svg} notifications={notifications} />
    )
}