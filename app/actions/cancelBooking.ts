"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Models, Query } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

interface Room extends Models.Document {
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
}

export async function cancelBooking(bookingId: string) {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
	const roomsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION;

	if (!databaseId || !roomsCollectionId) {
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
				error: "You must be logged in to cancel a booking",
			};
		}

		// Get the booking
		const booking = await databases.getDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
			process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION as string,
			bookingId
		);

		// Check if booking belongs to current user
		if (booking.user_id !== user.$id) {
			return {
				error: "You are not authorized to cancel this booking",
			};
		}

		// Delete booking
		await databases.deleteDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
			process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION as string,
			bookingId
		);
		revalidatePath("/bookings", "layout");

		return {
			success: true,
		};
	} catch (error) {
		console.error("Failed to cancel booking:", error);
		return {
			error: "Failed to cancel booking",
		};
	}
}
