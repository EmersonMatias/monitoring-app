"use client"
import Image from "next/image";
import HomeIcon from "@/public/HomeIcon.svg"
import EstatisticaIcon from "@/public/EstatisticaIcon.svg"
import PlusIcon from "@/public/PlusIcon.svg"
import SidebarIcon from "@/public/SidebarIcon.svg"
import ShieldIcon from "@/public/ShieldIcon.svg"
import AlertIcon from "@/public/AlertIcon.svg"
import Logo from "@/public/Logo.png"
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-20 bg-[#f0a830] flex items-center justify-center w-[100%]">

            <div className="absolute left-20">
                <Image src={Logo} style={{ width: "auto", height: "48px" }} alt="Icone de Estatística" />
            </div>

            <div className="flex gap-20">

                <Link href="estatistica">
                    <Image src={EstatisticaIcon} alt="Icone de Estatística" className="cursor-pointer" />

                </Link>

                <Link href="inicio">
                    <Image src={HomeIcon} alt="Icone de Início" className="cursor-pointer" />

                </Link>

                <Link href="criarvigilante">
                    <Image src={PlusIcon} alt="Icone de Adicionar" className="cursor-pointer" />
                </Link>

                <Link href="https://ip.epavi360gps.com.br/login">
                    <Image src={ShieldIcon} alt="Icone de Adicionar" className="cursor-pointer" />
                </Link>

            </div>

            <div className="absolute right-20 flex gap-8">
                <Image src={AlertIcon} alt="Icone de Estatística" />

                <Image src={SidebarIcon} alt="Icone de Estatística" />
            </div>
        </header>
    )
}