interface HeadingProps {
	title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
	return (
		<section className="bg-white mb-6 shadow-md px-6 py-5 rounded-lg">
			<h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
				{title}
			</h1>
		</section>
	);
};

export default Heading;
