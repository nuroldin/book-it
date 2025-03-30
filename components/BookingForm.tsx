const BookingForm = () => {
	return (
		<div className="mt-6">
			<h2 className="text-xl font-bold">Book this Room</h2>
			<form className="mt-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{["Check-In", "Check-Out"].map((label) => (
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
					{["Check-In", "Check-Out"].map((label) => (
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
