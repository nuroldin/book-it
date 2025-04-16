"use server";

import { createSessionClient } from "@/config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Models, Query } from "node-appwrite";

interface Room extends Models.Document {
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
}

export async function getMyRooms() {
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
		return rooms as Room[];
	} catch (error) {
		console.error("Failed to get user rooms:", error);
		redirect("/error");
	}
}
