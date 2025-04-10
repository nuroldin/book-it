"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function checkAuth() {
	const sessionCookie = (await cookies()).get("bookit_session");

	if (!sessionCookie) {
		return {
			isAuthenticated: false,
			user: null,
		};
	}

	try {
		const { account } = await createSessionClient(sessionCookie.value);
		const user = await account.get();

		return {
			isAuthenticated: true,
			user,
		};
	} catch (error) {
		return {
			isAuthenticated: false,
			user: null,
		};
	}
}

export default checkAuth;
