import Link from "next/link";

export default function HeaderLink({ href, svg, notifications }: LinkCustomProps) {
    const notificationsExist = notifications !== undefined && notifications !== 0

    return (
        <Link href={href} className="relative">
            {notificationsExist &&
                <div className={`text-white rounded-full w-[30px] h-[30px] flex justify-center items-center font-bold bg-red-500 absolute left-[-18px] top-[-8px] bg-opacity-80 ${notifications === 0 && "hidden"}`}>
                    {notifications}
                </div>
            }

            {svg}
        </Link>
    )
}

type LinkCustomProps = {
    href: string
    svg: JSX.Element
    notifications?: number 
}