const Footer = () => {
	return (
		<footer className="py-6">
			<div className="container mx-auto px-4 text-center">
				<p className="text-sm text-gray-600">
					&copy; {new Date().getFullYear()} Bookit. All rights reserved.
					<span className="hidden md:inline-block text-gray-500 hover:text-gray-800 transition">
						&nbsp;(Secret Recipe: 🤍)
					</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
