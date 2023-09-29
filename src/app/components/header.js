import React from 'react'
import Link from "next/link";
export default function Header() {

	return (
		<>
			<header className="w-full fixed top-0 z-50 text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font shadow-lg">
				<div className="container flex flex-col items-center md:items-start justify-between p-6 mx-auto md:flex-row">
					<a className="flex items-center font-medium text-gray-900 title-font md:mb-0 mb-2 text-xl">
						&lt;prompt-form /&gt;
					</a>
					<nav className="flex flex-wrap items-center justify-center  text-base md:ml-auto md:mr-auto md:mb-0 mb-2 ">
						<Link
							href="/"
							className="mx-3 font-medium hover:text-gray-900"
						>
							Oluştur
						</Link>
						<Link
							href="/LibraryScreen"
							className="mx-3 font-medium hover:text-gray-900"
						>
							Kütüphane
						</Link>
					</nav>
					<div className="items-center h-full">
						<a href="#_"
							className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded-lg shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
							Share
						</a>
					</div>
				</div>
			</header>
		</>
	)
}
