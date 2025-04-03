import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";

const lora = Lora({
	subsets: ["latin"],
	variable: "--font-lora",
	weight: ["400", "700"],
	style: ["normal", "italic"],
});

export const metadata: Metadata = {
	title: "Bookit - Effortless Room Booking App",
	description:
		"Bookit is a seamless and intuitive app for booking rooms in seconds. Find, book, and manage reservations effortlessly with our user-friendly platform.",
	keywords: [
		"room booking",
		"hotel reservation",
		"Bookit app",
		"room reservation",
		"online booking",
		"hotel booking",
		"vacation rental",
		"stay booking",
	],
	authors: [{ name: "Nuroldin U. Pimping", url: "https://nuroldin.com" }],
	creator: "Nuroldin U. Pimping",
	openGraph: {
		title: "Bookit - Effortless Room Booking App",
		description:
			"Bookit lets you find and book rooms instantly. Experience hassle-free reservations with a modern, easy-to-use interface.",
		url: "https://bookit-app.com",
		siteName: "Bookit",
		images: [
			{
				url: "https://bookit-app.com/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Bookit - Room Booking App",
			},
		],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Bookit - Effortless Room Booking App",
		description:
			"Bookit is a seamless and intuitive app for booking rooms in seconds. Find, book, and manage reservations effortlessly.",
		images: ["https://bookit-app.com/twitter-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={lora.variable + `dark`}>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					<main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						{children}
					</main>
					<Footer />
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
						transition={Bounce}
					/>
				</ThemeProvider>
			</body>
		</html>
	);
}
