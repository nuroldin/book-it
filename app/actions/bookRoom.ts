"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ID, Models } from "node-appwrite";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";

type BookingFormState = {
	success?: string;
	error?: string;
};

export async function bookRoom(
	_prevState: BookingFormState,
	formData: FormData
): Promise<BookingFormState> {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
	const bookingsCollectionId =
		process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION;

	if (!databaseId || !bookingsCollectionId) {
		console.error("Missing Appwrite environment variables");
		return { error: "Server misconfiguration. Try again later." };
	}

	const sessionCookie = (await cookies()).get("bookit_session");
	if (!sessionCookie?.value) {
		redirect("/login");
	}

	try {
		const { databases } = await createSessionClient(sessionCookie.value);

		const { user } = await checkAuth();
		if (!user) return { error: "You must be logged in to book a room." };

		// Extract and validate form inputs
		const roomId = formData.get("room_id")?.toString() ?? "";
		const checkInDate = formData.get("check_in_date")?.toString() ?? "";
		const checkOutDate = formData.get("check_out_date")?.toString() ?? "";
		const checkInTime = formData.get("check_in_time")?.toString() ?? "";
		const checkOutTime = formData.get("check_out_time")?.toString() ?? "";

		if (
			!roomId ||
			!checkInDate ||
			!checkOutDate ||
			!checkInTime ||
			!checkOutTime
		) {
			return { error: "All fields are required." };
		}

		const checkInDateTime = new Date(`${checkInDate}T${checkInTime}`);
		const checkOutDateTime = new Date(`${checkOutDate}T${checkOutTime}`);

		if (isNaN(checkInDateTime.getTime()) || isNaN(checkOutDateTime.getTime())) {
			return { error: "Invalid date/time format." };
		}

		if (checkInDateTime >= checkOutDateTime) {
			return { error: "Check-out must be after check-in." };
		}

		const bookingData = {
			check_in: checkInDateTime.toISOString(),
			check_out: checkOutDateTime.toISOString(),
			user_id: user.$id,
			room_id: roomId,
		};

		await databases.createDocument(
			databaseId,
			bookingsCollectionId,
			ID.unique(),
			bookingData
		);

		revalidatePath("/bookings", "layout");

		return { success: "Room booked successfully!" };
	} catch (err) {
		console.error("Error booking room:", err);
		return { error: "Something went wrong. Please try again later." };
	}
}
