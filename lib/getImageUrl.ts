// lib/getImageUrl.ts
import { Client, Storage } from "node-appwrite";

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

const storage = new Storage(client);

export const getImageUrl = (fileId: string) => {
	const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET;
	if (!bucketId) {
		throw new Error("Bucket ID is not defined");
	}
	return storage
		.getFilePreview(bucketId, fileId)
		.then((buffer) => URL.createObjectURL(new Blob([buffer])))
		.catch((error) => {
			throw new Error(`Failed to get file preview: ${error.message}`);
		});
};
