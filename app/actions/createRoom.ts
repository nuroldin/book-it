"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

interface RoomFormData {
	name: string;
	description: string;
	sqft: string;
	capacity: string;
	location: string;
	address: string;
	availability: string;
	price_per_hour: string;
	amenities: string;
}

interface CreateRoomResponse {
	error?: string;
	success?: boolean;
}

async function createRoom(
	previousState: unknown,
	formData: FormData
): Promise<CreateRoomResponse | void> {
	// Get databases instance
	const { databases, storage } = await createAdminClient();

	try {
		const { user } = await checkAuth();

		if (!user) {
			return {
				error: "You must be logged in to create a room",
			};
		}

		// Uploading image
		let imageID;

		const image = formData.get("image") as File;

		if (image && image.size > 0 && image.name !== "undefined") {
			try {
				// Upload
				const response = await storage.createFile("rooms", ID.unique(), image);
				imageID = response.$id;
			} catch (error) {
				console.log("Error uploading image:", error);
				return {
					error: "Error uploading image",
				};
			}
		} else {
			console.log("No image provided or invalid image");
		}
		// Create room
		const newRoom = await databases.createDocument(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
			process.env.NEXT_PUBLIC_APPWRITE_ROOMS_COLLECTION as string,
			ID.unique(),
			{
				user_id: user.$id,
				name: formData.get("name") as string,
				description: formData.get("description") as string,
				sqft: formData.get("sqft") as string,
				capacity: formData.get("capacity") as string,
				location: formData.get("location") as string,
				address: formData.get("address") as string,
				availability: formData.get("availability") as string,
				price_per_hour: formData.get("price_per_hour") as string,
				amenities: formData.get("amenities") as string,
				image: imageID,
			}
		);
		revalidatePath("/", "layout");

		return {
			success: true,
		};
	} catch (error) {
		console.log(error);
		const errorMessage =
			(error as { response?: { message?: string } }).response?.message ||
			"An unexpected error has occured";
		return {
			error: errorMessage,
		};
	}
}

export default createRoom;
