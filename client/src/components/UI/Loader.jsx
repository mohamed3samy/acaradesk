const Loader = () => {
	return (
		<div className="fixed inset-0 bg-black/[0.6] z-[5000] flex justify-center items-center">
			<div className="w-16 h-16 border-8 border-solid border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin" />
		</div>
	);
};

export default Loader;
