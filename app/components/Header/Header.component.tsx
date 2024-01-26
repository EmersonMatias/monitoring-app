"use client"
import Image from "next/image";
import Logo from "@/public/Logo.png"
import { handleExit } from "@/app/vigilante/components/VigilantHeader.component";
import { useRouter } from "next/navigation";
import HeaderLink from "./HeaderLink.component";
import { HeaderLinkCreateAgency, HeaderLinkCreateVigilant, HeaderLinkHome, HeaderLinkReports, HeaderLinkSettings, HeaderLinkStatistic } from "./constants";
import HeaderContingency from "./HeaderContingency.component";
import HeaderStatus from "./HeaderStatus.component";
import HeaderMessages from "./HeaderMessages.component";
import HeaderAlerts from "./HeaderAlerts.component";

export default function Header() {
    const router = useRouter()

    return (
        <header className="h-32 bg-[#f0a830] flex items-center justify-between w-[100%]">

            <div className="flex ml-10 items-center">
                <Image src={Logo} style={{ width: "auto", height: "48px" }} alt="Logo" />
            </div>

            <div className="flex gap-10 items-center">
                <HeaderLink href={HeaderLinkStatistic.href} svg={HeaderLinkStatistic.svg} name="ESTATÍSTICAS"/>

                <HeaderLink href={HeaderLinkCreateVigilant.href} svg={HeaderLinkCreateVigilant.svg} name="CRIAR VIGILANTE"/>

                <HeaderLink href={HeaderLinkCreateAgency.href} svg={HeaderLinkCreateAgency.svg} name="CRIAR VIGILANTE"/>

                <HeaderContingency />

                <HeaderLink href={HeaderLinkHome.href} svg={HeaderLinkHome.svg} name="INICIO"/>

                <HeaderLink href={HeaderLinkReports.href} svg={HeaderLinkReports.svg} name="RELATÓRIOS"/>

                <HeaderLink href={HeaderLinkSettings.href} svg={HeaderLinkSettings.svg} name="CONFIGURAÇÕES"/>

                <HeaderStatus />
            </div>

            <div className="flex gap-5 mr-10 items-center">
                <HeaderAlerts/>

                <HeaderMessages />

                <button className=" bg-red-400 px-4 py-3 h-fit w-fit font-bold rounded text-white ml-5" onClick={() => { handleExit(router) }}>Sair</button>
            </div>

        </header>
    )
}


