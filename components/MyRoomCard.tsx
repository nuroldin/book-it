"use client";

import Link from "next/link";
import { FC } from "react";
import { Room } from "@/lib/types"; // define your Room type elsewhere
import { Eye } from "lucide-react"; // cleaner modern icons
import DeleteRoomButton from "./DeleteRoomButton";

type MyRoomCardProps = {
	room: Room;
	onDelete?: (id: string) => void; // callback for delete action
};

const MyRoomCard: FC<MyRoomCardProps> = ({ room, onDelete }) => {
	return (
		<div className="bg-white shadow rounded-2xl p-4 mt-4 flex flex-col sm:flex-row justify-between items-center">
			<div className="flex flex-col">
				<h4 className="text-lg font-semibold">{room.name}</h4>
				{/* Optional: Add more room details here */}
			</div>

			<div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-4 sm:mt-0">
				<Link
					href={`/rooms/${room.$id}`}
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl mb-2 sm:mb-0 w-full sm:w-auto flex items-center justify-center transition-all"
					aria-label={`View room ${room.name}`}
				>
					<Eye className="w-4 h-4 mr-2" />
					View
				</Link>

				<DeleteRoomButton $id={room.$id} name={room.name} />
			</div>
		</div>
	);
};

export default MyRoomCard;
