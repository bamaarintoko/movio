import type { Metadata } from "next";
import "./globals.css";

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
};

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

					{children}
				</div>
			</body>
		</html>
	);
}
