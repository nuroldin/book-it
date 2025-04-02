"use server";

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { Models } from "node-appwrite";

interface Room extends Models.Document {
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
}

export async function getSingleRoom(id: string): Promise<Room | null> {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
	const roomsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION;

	if (!databaseId || !roomsCollectionId) {
		console.error("Missing Appwrite environment variables");
		return null;
	}

	try {
		const { databases } = await createAdminClient();
		const room = await databases.getDocument(databaseId, roomsCollectionId, id);
		return room as Room;
	} catch (error) {
		console.error("Error fetching room:", error);
		redirect("/error");
	}
}
