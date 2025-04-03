"use server";

async function createSession(state: void, formData: FormData) {
	const email = formData.get("email") as string | null;
	const password = formData.get("password") as string | null;

	if (email && password) {
		console.log(email, password);
	} else {
		console.error("Email or password is missing.");
	}
}

export default createSession;
