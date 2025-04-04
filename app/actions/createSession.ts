"use server";

import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";

const createSession = async (
	state: { error?: string; success?: boolean } | undefined,
	formData: FormData
): Promise<{ error?: string; success?: boolean }> => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Please fill out all fields" };
	}

	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailPasswordSession(email, password);

		(await cookies()).set("bookit_session", session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			expires: new Date(session.expire),
			path: "/",
		});

		return { success: true };
	} catch (error) {
		console.log("Authentication Error: ", error);
		return { error: "Invalid Credentials" };
	}
};

export default createSession;
