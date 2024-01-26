'use client'
import { useFindAllMessages } from "@/hooks/hooks-messages";
import HeaderLink from "./HeaderLink";
import { HeaderLinkMessages } from "./constants";
import { useRef } from "react";
import { messageAlert } from "./functions";

export default function HeaderMessages() {
    const { data: messages, isSuccess, isPending } = useFindAllMessages()
    const messagesRef = useRef<TMessage[]>()
    const notifications = messages?.filter((message) => message?.viewed === false)?.length

    messageAlert({ isSuccess, messages, messagesRef })

    return (
        <HeaderLink href={HeaderLinkMessages.href} svg={HeaderLinkMessages.svg} notifications={notifications} name="MENSAGENS" />
    )
}