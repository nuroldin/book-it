"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Models, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

interface Room extends Models.Document {
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
}

type DeleteRoomsResult = { success: true } | { success: false; error: string };

export async function deleteRooms(roomId: string): Promise<DeleteRoomsResult> {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
	const roomsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION;

	if (!databaseId || !roomsCollectionId) {
		console.error("Missing Appwrite environment variables");
		return {
			success: false,
			error: "Missing Appwrite environment variables",
		};
	}

	const sessionCookie = (await cookies()).get("bookit_session");
	if (!sessionCookie || sessionCookie.value === "") {
		redirect("/login");
	}

	try {
		const { account, databases } = await createSessionClient(
			sessionCookie.value
		);

		const user = await account.get();
		const userId = user.$id;

		const { documents: rooms } = await databases.listDocuments(
			databaseId,
			roomsCollectionId,
			[Query.equal("user_id", userId)]
		);

		// Find room to delete
		const roomToDelete = rooms.find((room) => room.$id === roomId);

		//Find room to delete
		if (roomToDelete) {
			await databases.deleteDocument(
				databaseId,
				roomsCollectionId,
				roomToDelete.$id
			);

			// Revalidate my rooms and all rooms
			revalidatePath("/rooms/my", "layout");
			revalidatePath("/", "layout");
			return {
				success: true,
			};
		} else {
			return {
				success: false,
				error: "Room not found",
			};
		}
	} catch (error) {
		console.error("Failed to delete room:", error);
		return {
			success: false,
			error: "Failed to delete room",
		};
	}
}
