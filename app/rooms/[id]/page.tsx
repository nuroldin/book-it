import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import rooms from "@/data/rooms.json";
import BookingForm from "@/components/BookingForm";

interface Room {
	$id: string;
	name: string;
	image: string;
	address: string;
	description: string;
	availability: string;
	sqft: number;
	price_per_hour: number;
}

interface RoomPageProps {
	params: { id: string };
}

const RoomPage = ({ params }: RoomPageProps) => {
	const { id } = params;
	const room = rooms.find((room) => room.$id === id);

	if (!room) {
		return <Heading title="Room Not Found" />;
	}

	const formattedPrice = new Intl.NumberFormat("en-PH", {
		style: "currency",
		currency: "PHP",
	}).format(room.price_per_hour);

	return (
		<>
			<Heading title={room.name} />
			<div className="bg-white shadow rounded-lg p-6">
				<Link
					href="/"
					className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
				>
					<ChevronLeft className="mr-2 w-4 h-4" />
					<span>Back to Rooms</span>
				</Link>

				<div className="flex flex-col sm:flex-row sm:space-x-6">
					<Image
						src={`/images/rooms/${room.image}`}
						width={400}
						height={100}
						alt={room.name}
						className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
					/>

					<div className="mt-4 sm:mt-0 sm:flex-1">
						<p className="text-gray-600 mb-4">{room.description}</p>

						<ul className="space-y-2">
							<li>
								<span className="font-semibold text-gray-800">Size:&nbsp;</span>
								{room.sqft.toLocaleString()} ft<sup>2</sup>
							</li>
							<li>
								<span className="font-semibold text-gray-800">
									Availability:&nbsp;
								</span>
								{room.availability}
							</li>
							<li>
								<span className="font-semibold text-gray-800">
									Price:&nbsp;
								</span>
								{formattedPrice}/hour
							</li>
							<li>
								<span className="font-semibold text-gray-800">
									Address:&nbsp;
								</span>
								{room.address}
							</li>
						</ul>
					</div>
				</div>
				<BookingForm />
			</div>
		</>
	);
};

export default RoomPage;
