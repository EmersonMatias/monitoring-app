"use client"
import Image from "next/image";
import HomeIcon from "@/public/HomeIcon.svg"
import EstatisticaIcon from "@/public/EstatisticaIcon.svg"
import PlusIcon from "@/public/PlusIcon.svg"
import SidebarIcon from "@/public/SidebarIcon.svg"
import Link from "next/link";

export default function Header() {
    return (
        <header className="h-20 bg-blue-950 flex items-center justify-center w-[100%]">

            <div className="flex gap-20">

                <Image src={EstatisticaIcon} alt="Icone de Estatística" className="cursor-pointer" />

                <Link href="inicio">
                    <Image src={HomeIcon} alt="Icone de Início" className="cursor-pointer" />

                </Link>

                <Link href="criarvigilante">
                    <Image src={PlusIcon} alt="Icone de Adicionar" className="cursor-pointer" />
                </Link>
            </div>

            <div className="absolute right-20">
                <Image src={SidebarIcon} alt="Icone de Estatística" />
            </div>
        </header>
    )
}