"use server";

import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

async function createUser(previousState: any, formData: FormData) {
	const name = formData.get("name") as string | null;
	const email = formData.get("email") as string | null;
	const password = formData.get("password") as string | null;
	const confirmPassword = formData.get("confirm-password") as string | null;

	if (!name || !email || !password) {
		return {
			error: "Please fill in all fields",
		};
	}

	if (typeof password === "string" && password.length < 8) {
		return {
			error: "Password must be at least 8 characters long",
		};
	}

	if (password !== confirmPassword) {
		return {
			error: "Passwords do not match",
		};
	}

	const { account } = await createAdminClient();

	try {
		await account.create(
			ID.unique(),
			email as string,
			password as string,
			name as string
		);

		return {
			success: true,
		};
	} catch (error) {
		console.log("Registration Error: ", error);
		return {
			error: "Could not register user",
		};
	}
}

export default createUser;
