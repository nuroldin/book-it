import BookedRoomCard from "@/components/BookedRoomCard";
import { getMyBookings } from "../actions/getMyBookings";
import Heading from "@/components/Heading";

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

const BookingsPage = async () => {
	const bookings = await getMyBookings();

	// Handle API error
	if ("error" in bookings) {
		return (
			<>
				<Heading title="My Bookings" />
				<p className="text-red-600 mt-4">{bookings.error}</p>
			</>
		);
	}

	// No bookings
	if (Array.isArray(bookings) && bookings.length === 0) {
		return (
			<>
				<Heading title="My Bookings" />
				<p className="text-gray-600 mt-4">You have no bookings.</p>
			</>
		);
	}

	// Render bookings
	return (
		<>
			<Heading title="My Bookings" />
			{(bookings as Booking[]).map((booking) => (
				<BookedRoomCard key={booking.$id} booking={booking} />
			))}
		</>
	);
};

export default BookingsPage;
