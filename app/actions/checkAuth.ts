"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Models } from "node-appwrite"; // Import Models for the correct type

async function checkAuth() {
	const sessionCookie = (await cookies()).get("bookit_session");

	if (!sessionCookie) {
		return {
			isAuthenticated: false,
			user: null, // Ensure user is null if not authenticated
		};
	}

	try {
		const { account } = await createSessionClient(sessionCookie.value);
		const user = await account.get(); // Get the full user object from Appwrite

		// Return the full user object
		return {
			isAuthenticated: true,
			user, // No need to manually modify the user
		};
	} catch (error) {
		return {
			isAuthenticated: false,
			user: null, // If error, return null for user
		};
	}
}

export default checkAuth;
