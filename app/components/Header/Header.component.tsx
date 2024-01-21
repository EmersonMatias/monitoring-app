"use client"
import Image from "next/image";
import Logo from "@/public/Logo.png"
import { handleExit } from "@/app/vigilante/components/VigilantHeader.component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFindAllAlerts, useUpdateAlert } from "@/hooks/hooks-alert";
import styles from "../../(admin)/criarvigilante/styles.module.css"
import HeaderLink from "./HeaderLink.component";
import { HeaderLinkCreateVigilant, HeaderLinkHome, HeaderLinkReports, HeaderLinkSettings, HeaderLinkStatistic } from "./constants";
import HeaderContingency from "./HeaderContingency.component";
import HeaderStatus from "./HeaderStatus.component";
import HeaderMessages from "./HeaderMessages.component";
import HeaderAlerts from "./HeaderAlerts.component";

export default function Header() {
    const router = useRouter()

    return (
        <header className="h-20 bg-[#f0a830] flex items-center justify-center w-[100%]">

            <div className="absolute left-20">
                <Image src={Logo} style={{ width: "auto", height: "48px" }} alt="Logo" />
            </div>

            <div className="flex gap-20">
                <HeaderLink href={HeaderLinkStatistic.href} svg={HeaderLinkStatistic.svg} />

                <HeaderLink href={HeaderLinkCreateVigilant.href} svg={HeaderLinkCreateVigilant.svg} />

                <HeaderContingency />

                <HeaderLink href={HeaderLinkHome.href} svg={HeaderLinkHome.svg} />

                <HeaderLink href={HeaderLinkReports.href} svg={HeaderLinkReports.svg} />

                <HeaderLink href={HeaderLinkSettings.href} svg={HeaderLinkSettings.svg} />

                <HeaderStatus />
            </div>

            <div className="absolute right-20 flex gap-8">
                <HeaderAlerts/>

                <HeaderMessages />

                <button className=" bg-[#FC6F6F] p-2 font-bold rounded" onClick={() => { handleExit(router) }}>Sair</button>
            </div>

        </header>
    )
}


