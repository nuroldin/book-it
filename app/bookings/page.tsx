import { getMyBookings } from "../actions/getMyBookings";

const BookingsPage = async () => {
	const bookings = await getMyBookings();
	console.log(bookings);
	return (
		<>
			{Array.isArray(bookings) && bookings.length === 0 ? (
				<p className="text-gray-600 mt-4">You have no bookings.</p>
			) : "map" in bookings ? (
				bookings.map((booking) => <h3>Hello!</h3>)
			) : (
				<p className="text-red-600 mt-4">{bookings.error}</p>
			)}
		</>
	);
};

export default BookingsPage;
