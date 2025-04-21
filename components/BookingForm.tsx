"use client";

import RoomCard from "./RoomCard";
import { FC, useEffect } from "react";
import { bookRoom } from "@/app/actions/bookRoom";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type Room = {
	$id: string;
	name: string;
	address: string;
	availability: string;
	price_per_hour: number;
};

type BookingFormProps = {
	room: Room;
};

type BookingFormState = {
	error?: string;
	success?: string;
};

const BookingForm: FC<BookingFormProps> = ({ room }) => {
	const [state, formAction] = useActionState(bookRoom, {});
	const router = useRouter();

	useEffect(() => {
		if (state.error) toast.error(state.error);
		if (state.success) {
			toast.success(state.success);
			router.push("/bookings");
		}
	}, [state, router]);

	return (
		<div className="mt-6">
			<h2 className="text-xl font-bold">Book this Room</h2>
			<form className="mt-4" action={formAction}>
				<input type="hidden" name="room_id" value={room.$id} />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{["Check_in", "Check_out"].map((label) => (
						<div key={label}>
							<label
								htmlFor={`${label.toLowerCase()}_date`}
								className="block text-sm font-medium text-gray-700"
							>
								{label} Date
							</label>
							<input
								type="date"
								id={`${label.toLowerCase()}_date`}
								name={`${label.toLowerCase()}_date`}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
							/>
						</div>
					))}
					{["Check_in", "Check_out"].map((label) => (
						<div key={label}>
							<label
								htmlFor={`${label.toLowerCase()}_time`}
								className="block text-sm font-medium text-gray-700"
							>
								{label} Time
							</label>
							<input
								type="time"
								id={`${label.toLowerCase()}_time`}
								name={`${label.toLowerCase()}_time`}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								required
							/>
						</div>
					))}
				</div>

				<div className="mt-6">
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
					>
						Book Room
					</button>
				</div>
			</form>
		</div>
	);
};

export default BookingForm;
