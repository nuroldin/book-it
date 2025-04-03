"use server";

const createSession = async (
	state: { error: string } | undefined,
	formData: FormData
): Promise<{ error: string } | undefined> => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Please fill out all fields" };
	}

	console.log(email, password);
};

export default createSession;
