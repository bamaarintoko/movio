import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
	title: "Moovioo - Discover & Explore Movies",
	description:
		"Moovioo is your ultimate movie database. Discover, explore, and stay updated with the latest movies, ratings, and reviews.",
	keywords: [
		"movies",
		"movie database",
		"film reviews",
		"latest movies",
		"movie ratings",
		"Moovioo",
		"cinema",
		"film discovery",
	],
	authors: [{ name: "Moovioo Team" }],
	manifest: "/manifest.webmanifest",
	// themeColor: "#000000",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Moovioo",
	},
	icons: {
		icon: "/icons/icon-192.png",
		apple: "/icons/apple-touch-icon.png",
	},
};

export const viewport: Viewport = {
	themeColor: 'black',
}



export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={` antialiased`}
			>

				<div>
					<Providers>


						{children}
					</Providers>
				</div>
			</body>
		</html>
	);
}
