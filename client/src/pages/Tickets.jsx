import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTickets, reset } from "../features/tickets/ticketSlice";
import Container from "../components/layout/Container";
import TicketItem from "../components/layout/TicketItem";
import Loader from "../components/UI/Loader";

const Tickets = () => {
	const { tickets, isLoading, isSuccess } = useSelector(
		(state) => state.tickets
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTickets());

		return () => {
			if (isSuccess) dispatch(reset());
		};
	}, [dispatch, isSuccess]);

	if (isLoading) return <Loader />;

	return (
		<section className="overflow-x-hidden min-h-screen">
			<Container
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 100 }}
				className="h-full pt-20 md:pt-32 pb-16"
			>
				<div className="w-full flex justify-center items-center mt-14 mb-6">
					<h2 className="text-gray-700 text-2xl sm:text-3xl font-bold tracking-wide font-mono">
						Tickets
					</h2>
				</div>

				{tickets && tickets.length !== 0 ? (
					<table className="w-full shadow-md text-left bg-white mx-auto lg:w-3/4 rounded-md">
						<thead>
							<tr className="border-b border-gray-200">
								<th className="py-5 sm:pl-10 pl-2 w-1/4 text-base text-gray-800">
									Date
								</th>
								<th className="py-5 w-1/4 text-base text-gray-800 text-center">
									Product
								</th>
								<th className="py-5 w-1/4 text-base text-gray-800 text-center">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{tickets?.map((ticket) => (
								<TicketItem
									key={ticket._id}
									ticket={ticket}
								/>
							))}
						</tbody>
					</table>
				) : (
					<div className="text-xl lg:text-2xl text-gray-700 w-full flex justify-center pt-28 mt-20">
						<h2>No tickets yet 🎫</h2>
					</div>
				)}
			</Container>
		</section>
	);
};

export default Tickets;
