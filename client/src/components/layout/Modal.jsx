import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { HiX } from "react-icons/hi";

import { createNote } from "../../features/notes/noteSlice";
import Button from "../UI/Button";
import { TextArea } from "../UI/Fields";

const Modal = ({ ticketId, isOpen, closeModal }) => {
	const [noteText, setNoteText] = useState("");

	const dispatch = useDispatch();

	// Create note submit
	const onNoteSubmit = (e) => {
		e.preventDefault();
		dispatch(createNote({ noteText, ticketId }));
		closeModal();
	};

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-[60] inset-0 overflow-y-auto"
				onClose={closeModal}
			>
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div className="relative inline-block align-middle bg-white rounded-lg p-4 overflow-hidden shadow-xl transform transition-all w-full sm:max-w-lg sm:p-6">
							<div className="block absolute top-0 right-0 pt-4 pr-4">
								<button
									type="button"
									className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
									onClick={closeModal}
								>
									<span className="sr-only">Close</span>
									<HiX
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</button>
							</div>
							<div className="sm:flex sm:items-start">
								<div className="mt-3 sm:mt-0 px-4 text-left w-full">
									<Dialog.Title
										as="h3"
										className="text-lg leading-6 font-medium text-gray-900"
									>
										Add Note
									</Dialog.Title>
									<form
										onSubmit={onNoteSubmit}
										className="mt-6 w-full"
									>
										<TextArea
											name="note"
											id="note"
											value={noteText}
											onChange={(e) =>
												setNoteText(e.target.value)
											}
										/>
										<Button
											disabled={
												noteText.length === 0 &&
												true
											}
											className="w-full mt-6"
										>
											Submit
										</Button>
									</form>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
