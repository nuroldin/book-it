"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

const destroySession = async () => {
	const sessionId = (await cookies()).get("bookit_session")?.value;

	if (!sessionId) {
		return { error: "Session not found" };
	}

	try {
		const { account } = await createSessionClient(sessionId);
		await account.deleteSession("current");

		(await cookies()).delete("bookit_session");

		return { success: true };
	} catch (error) {
		return { error: "Error deleting session" };
	}
};

export default destroySession;
