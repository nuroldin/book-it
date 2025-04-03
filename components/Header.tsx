import Image from "next/image";
import Link from "next/link";
import { LogIn, User, Building, LogOut } from "lucide-react";
import logo from "@/assets/images/logo.svg";
import { ToggleTheme } from "./ToggleButton";

const Header = () => {
	return (
		<header className="bg-gray-100">
			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<Link href="/">
							<Image className="h-12 w-12" src={logo} alt="Bookit" priority />
						</Link>
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-4">
								<Link
									href="/"
									className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
								>
									Rooms
								</Link>
								<Link
									href="/bookings"
									className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
								>
									Bookings
								</Link>
								<Link
									href="/room/add"
									className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
								>
									Add Room
								</Link>
							</div>
						</div>
					</div>
					<div className="ml-auto">
						<div className="ml-4 flex items-center md:ml-6">
							<Link
								href="/login"
								className="mr-3 flex items-center text-gray-800 hover:text-gray-600"
							>
								<LogIn className="w-3 h-3 mr-1" /> Login
							</Link>
							<Link
								href="/register"
								className="mr-3 flex items-center text-gray-800 hover:text-gray-600"
							>
								<User className="w-3 h-3 mr-1" /> Register
							</Link>
							<Link
								href="/rooms/my"
								className="flex items-center text-gray-800 hover:text-gray-600"
							>
								<Building className="w-3 h-3 mr-1" /> My Rooms
							</Link>
							<Link
								href="/logout"
								className="mx-3 flex items-center text-gray-800 hover:text-gray-600"
							>
								<LogOut className="w-3 h-3 mr-1" /> Sign Out
							</Link>
							<ToggleTheme />
						</div>
					</div>
				</div>
			</nav>
			<div className="md:hidden">
				<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
					<Link
						href="/"
						className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
					>
						Rooms
					</Link>
					<Link
						href="/bookings"
						className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
					>
						Bookings
					</Link>
					<Link
						href="/rooms/add"
						className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
					>
						Add Room
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
