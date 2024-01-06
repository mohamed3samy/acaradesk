import { motion } from "framer-motion";
import clsx from "clsx";

const Container = ({ className, ...props }) => {
	return (
		<motion.div
			className={clsx(
				"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				className
			)}
			{...props}
		/>
	);
};

export default Container;
