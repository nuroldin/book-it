import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import AuthWrapper from "@/components/AuthWrapper";

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
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<AuthWrapper>
			<html lang="en" suppressHydrationWarning className={lora.variable}>
				<head>
					<script
						dangerouslySetInnerHTML={{
							__html: `
              (function() {
                let theme = localStorage.getItem('theme') || 'system';
                let systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                let isDark = theme === 'dark' || (theme === 'system' && systemDark);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
						}}
					/>
				</head>
				<body className={cn("antialiased")}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
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
							autoClose={700}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick={false}
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
							transition={Bounce}
						/>
					</ThemeProvider>
				</body>
			</html>
		</AuthWrapper>
	);
}
