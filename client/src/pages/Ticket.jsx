import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { HiArrowCircleLeft, HiPlus } from "react-icons/hi";

import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes } from "../features/notes/noteSlice";
import NoteItem from "../components/layout/NoteItem";
import Modal from "../components/layout/Modal";
import Container from "../components/layout/Container";
import Button from "../components/UI/Button";
import Loader from "../components/UI/Loader";

const Ticket = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { ticket, isLoading, isError } = useSelector(
		(state) => state.tickets
	);

	const { notes, isLoading: notesIsLoading } = useSelector(
		(state) => state.notes
	);

	const { ticketId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
	}, [dispatch, isError, ticketId]);

	// Close ticket
	const onTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success("Ticket Closed");
		navigate("/tickets");
	};

	// Open, close modal
	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	if (isError) {
		return (
			<div className="h-screen w-full flex justify-center items-center">
				<h2 className="text-xl text-gray-700">
					Something went wrong ☹️​
				</h2>
			</div>
		);
	}

	if (isLoading || notesIsLoading) return <Loader />;

	return (
		<section className="overflow-x-hidden min-h-screen">
			<Container
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="h-full flex justify-center items-start flex-col gap-6 pt-40 md:pt-48 pb-16"
			>
				<Button
					onClick={() => navigate(-1)}
					variant="outline"
					className="flex justify-center items-center px-6"
				>
					<HiArrowCircleLeft className="mr-1 text-lg" />
					<span className="text-base font-medium">Back</span>
				</Button>

				<div className="flex justify-between items-center pt-1 pb-2 w-full border-b-2">
					<span className="text-gray-800 text-base md:text-lg font-medium">
						Product: {ticket.product}
					</span>
					<span
						className={`${
							ticket.status === "new"
								? "bg-green-600"
								: "bg-red-700"
						} text-xs sm:text-sm md:text-base text-white px-6 py-2 rounded-full text-center`}
					>
						{ticket.status}
					</span>
				</div>
				<div className="flex flex-col justify-center items-start gap-2 bg-gray-100 w-full py-2 px-4 rounded-md border-2">
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 w-full">
						<span className="text-gray-800 text-base sm:text-lg font-medium order-2 md:order-1">
							Description of issue
						</span>
						<span className="text-gray-800 text-base order-1 md:order-2">
							{new Date(ticket.createdAt).toLocaleString(
								"en-US"
							)}
						</span>
					</div>
					<span className="text-gray-700 text-base">
						{ticket.description}
					</span>
				</div>

				{/* Add note */}
				{ticket?.status !== "closed" && (
					<Button
						onClick={openModal}
						className="flex justify-center items-center px-6"
					>
						<HiPlus className="mr-1 text-lg" />
						<span className="text-base font-medium">
							Add Note
						</span>
					</Button>
				)}

				{/* Modal */}
				<Modal
					ticketId={ticketId}
					isOpen={modalIsOpen}
					closeModal={closeModal}
				/>

				{/* Display notes */}
				<div className="w-full">
					{notes.length !== 0 && (
						<span className="text-gray-800 text-base sm:text-lg font-medium block">
							Notes
						</span>
					)}

					{notes?.map((note) => (
						<NoteItem note={note} key={note._id} />
					))}
				</div>

				{/* Close button */}
				{ticket?.status !== "closed" && (
					<button
						onClick={onTicketClose}
						className="w-full flex justify-center items-center bg-red-700 py-1 text-base md:text-lg text-white rounded-md tracking-wide"
					>
						Close Ticket
					</button>
				)}
			</Container>
		</section>
	);
};

export default Ticket;
