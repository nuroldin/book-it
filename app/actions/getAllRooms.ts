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

export async function getAllRooms() {
	const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
	const roomsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION;

	if (!databaseId || !roomsCollectionId) {
		console.error("Missing Appwrite environment variables");
		return [];
	}

	try {
		const { databases } = await createAdminClient();
		const { documents: rooms } = await databases.listDocuments(
			databaseId,
			roomsCollectionId
		);
		return rooms as Room[];
	} catch (error) {
		console.error("Error fetching rooms:", error);
		redirect("/error");
	}
}
