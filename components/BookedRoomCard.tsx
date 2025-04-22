import Link from "next/link";
import CancelBookingButton from "./CancelBookingButton";

export type Room = {
	user_id: string;
	name: string;
	description: string;
	address: string;
	location: string;
	availability: string;
	sqft: string;
	capacity: string;
	price_per_hour: string;
	amenities: string;
	image: string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
};

export type Booking = {
	user_id: string;
	check_in: string;
	check_out: string;
	$id: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	$databaseId: string;
	$collectionId: string;
	room_id: Room;
};

type Props = {
	booking: Booking;
};

const BookedRoomCard = ({ booking }: Props) => {
	const { room_id: room } = booking;

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);

		const options: Intl.DateTimeFormatOptions = {
			timeZone: "UTC",
			month: "long",
		};

		const month = date.toLocaleString("en-US", options);
		const day = date.getUTCDate();

		const timeOptions: Intl.DateTimeFormatOptions = {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
			timeZone: "UTC",
		};

		const time = date.toLocaleString("en-US", timeOptions);

		return `${month} ${day} at ${time}`;
	};

	return (
		<div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
			<div>
				<h4 className="text-lg font-semibold">{room.name}</h4>
				<p className="text-sm text-gray-600">
					<strong>Check In:</strong> {formatDate(booking.check_in)}
				</p>
				<p className="text-sm text-gray-600">
					<strong>Check Out:</strong> {formatDate(booking.check_out)}
				</p>
			</div>
			<div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
				<Link
					href={`/rooms/${room.$id}`}
					className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
				>
					View Room
				</Link>
				<CancelBookingButton bookingId={booking.$id} />
			</div>
		</div>
	);
};

export default BookedRoomCard;
