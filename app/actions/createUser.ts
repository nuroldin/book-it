"use server";

async function createUser(previousState, formData) {
	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");

	if (!name || !email || !password) {
		return {
			error: "All fields are required.",
			success: false,
		};
	}
}
