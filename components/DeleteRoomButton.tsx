"use client";

import { deleteRooms } from "@/app/actions/deleteRoom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { FC } from "react";

type DeleteRoomButtonProps = {
	$id: string;
	name: string;
	onSuccess?: () => void;
};

const DeleteRoomButton: FC<DeleteRoomButtonProps> = ({
	$id,
	name,
	onSuccess,
}) => {
	const handleDelete = async () => {
		const confirmed = window.confirm(
			`Are you sure you want to delete "${name}"?`
		);

		if (!confirmed) return;

		try {
			await deleteRooms($id);
			toast.success("Room deleted successfully");

			if (onSuccess) onSuccess();
		} catch (error) {
			console.error("Failed to delete room:", error);
			toast.error("Failed to delete room");
		}
	};

	return (
		<button
			onClick={handleDelete}
			className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl w-full sm:w-auto flex items-center justify-center transition-all"
			aria-label={`Delete room ${name}`}
		>
			<Trash2 className="w-4 h-4 mr-2" />
			Delete
		</button>
	);
};

export default DeleteRoomButton;
