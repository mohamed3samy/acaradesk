import { motion } from "framer-motion";
import clsx from "clsx";

const BackgroundIllustration = (props) => {
	return (
		<svg
			viewBox="0 0 1090 1090"
			aria-hidden="true"
			fill="none"
			preserveAspectRatio="none"
			{...props}
		>
			<circle cx={545} cy={545} r="544.5" />
			<circle cx={545} cy={545} r="480.5" />
			<circle cx={545} cy={545} r="416.5" />
			<circle cx={545} cy={545} r="352.5" />
		</svg>
	);
};

const AuthLayout = ({ title, subtitle, className, children }) => {
	return (
		<section
			className={clsx(
				"flex min-h-screen overflow-hidden px-6",
				className
			)}
		>
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{
					opacity: 0,
					y: 100,
				}}
				className="mx-auto flex w-full max-w-2xl flex-col justify-center px-4 sm:px-6"
			>
				<div className="relative z-10">
					<BackgroundIllustration
						width="1090"
						height="1090"
						className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto mt-12 sm:mt-16"
					/>
					<h1 className="text-center text-xl md:text-2xl font-medium tracking-tight text-gray-900">
						{title}
					</h1>
					{subtitle && (
						<p className="mt-3 text-center text-base md:text-lg text-gray-600">
							{subtitle}
						</p>
					)}
				</div>
				<div className="-mx-4 mt-8 md:mt-10 bg-white py-10 px-4 z-10 shadow-2xl shadow-gray-700/10 sm:mx-0 rounded-3xl sm:rounded-4xl md:rounded-5xl sm:p-16">
					{children}
				</div>
			</motion.div>
		</section>
	);
};

export default AuthLayout;
