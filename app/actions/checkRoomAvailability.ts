"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Models, Query } from "node-appwrite";
import { DateTime } from "luxon";

interface Room extends Models.Document {
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
}

// Convert a date string to a Luxon DateTime object in UTC
function toUTCDateTime(dateString: string) {
	return DateTime.fromISO(dateString, {
		zone: "utc",
	}).toUTC();
}

// Check for overlapping date ranges
function dateRangesOverlap(
	checkInA: DateTime,
	checkOutA: DateTime,
	checkInB: DateTime,
	checkOutB: DateTime
) {
	return checkInA <= checkOutB && checkOutA >= checkInB;
}

export async function checkRoomAvailability(
	roomId: string,
	checkIn: Date,
	checkOut: Date
) {
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

		const checkInDateTime = toUTCDateTime(checkIn as unknown as string);
		const checkOutDateTime = toUTCDateTime(checkOut as unknown as string);

		// Fetch all bookings for a given room
		const { documents: bookings } = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
			process.env.NEXT_PUBLIC_APPWRITE_BOOKINGS_COLLECTION as string,
			[Query.equal("room_id", roomId)]
		);

		// Loop over bookings and check for overlaps
		for (const booking of bookings) {
			const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
			const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

			if (
				dateRangesOverlap(
					checkInDateTime,
					checkOutDateTime,
					bookingCheckInDateTime,
					bookingCheckOutDateTime
				)
			) {
				return false; // Overlap found, do not book
			}
		}

		// No overlap found, continue to book
		return true;
	} catch (error) {
		console.error("Failed to check availability:", error);
		return {
			error: "Failed to check availability",
		};
	}
}
