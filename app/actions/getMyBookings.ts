"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Models, Query } from "node-appwrite";
import checkAuth from "./checkAuth";

interface Room extends Models.Document {
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
}

export async function getMyBookings() {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
	const bookingsCollectionId =
		process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION;

	if (!databaseId || !bookingsCollectionId) {
		console.error("Missing Appwrite environment variables");
		return [];
	}

	const sessionCookie = (await cookies()).get("bookit_session");
	if (!sessionCookie || sessionCookie.value === "") {
		redirect("/login");
	}

	try {
		const { databases } = await createSessionClient(sessionCookie.value);

		const { user } = await checkAuth();

		if (!user) {
			return {
				error: "You must be logged in to view your bookings.",
			};
		}

		const { documents: bookings } = await databases.listDocuments(
			databaseId,
			bookingsCollectionId,
			[Query.equal("user_id", user.$id)]
		);
		return bookings;
	} catch (error) {
		console.log("Failed to get user bookings:", error);
		return {
			error: "Failed to get bookings",
		};
	}
}
