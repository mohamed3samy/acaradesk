import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
	return (
		<section className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 grid place-items-center lg:px-8 text-center sm:text-start">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="max-w-max mx-auto"
			>
				<div className="sm:flex">
					<p className="text-4xl font-extrabold text-cyan-500 sm:text-5xl">
						404
					</p>
					<div className="sm:ml-6">
						<div className="sm:border-l sm:border-gray-300 sm:pl-6">
							<h1 className="text-4xl font-bold text-gray-800 tracking-tight sm:text-5xl">
								Page not found
							</h1>
							<p className="mt-2 text-base text-gray-500 px-6 sm:px-0">
								Please check the URL in the address bar and
								try again.
							</p>
						</div>
						<div className="mt-6 sm:mt-10 flex sm:border-l sm:border-transparent sm:pl-6 justify-center sm:justify-start">
							<Link
								to="/"
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
							>
								Go back home
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default NotFound;
