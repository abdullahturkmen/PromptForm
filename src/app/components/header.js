'use client';
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
	const pathname = usePathname();
	return (
		<>
			<header className="w-full fixed top-0 z-50 text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font shadow-md">
				<div className="w-full flex flex-col items-center md:items-start justify-between p-6 mx-auto md:flex-row  shadow-md">
					<Link href="/" className="flex items-center font-medium text-gray-900 title-font md:mb-0 mb-2 text-xl">
						&lt;prompt-form /&gt;
					</Link>
					<nav className="flex flex-wrap items-center justify-center  text-base md:ml-auto md:mr-auto md:mb-0 mb-2 ">
						<Link
							href="/"
							className={`mx-2 px-2 py-1 rounded-lg font-medium hover:text-gray-900 ${pathname == "/" ? "bg-gray-100" : ""}`}

						>
							Anasayfa
						</Link>
						<Link
							href="/library"
							className={`mx-2 px-2 py-1 rounded-lg font-medium hover:text-gray-900 ${pathname == "/library" ? "bg-gray-100" : ""}`}
						>
							Kütüphane
						</Link>
					</nav>
					<div className="items-center h-full">
						<Link href="/create"
							className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded-lg shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
							Oluştur
						</Link>
					</div>
				</div>
			</header>
		</>
	)
}
