import { useSelector } from "react-redux";

const NoteItem = ({ note }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className="flex flex-col justify-center items-start gap-2 bg-gray-100 w-full py-2 px-4 rounded-md border-2 my-4">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0 w-full">
				<h4 className="text-gray-800 font-medium text-base sm:text-lg order-2 md:order-1">
					Note From{" "}
					{note.isStaff ? (
						<span>Staff</span>
					) : (
						<span className="capitalize">{user.name}</span>
					)}
				</h4>
				<span className="text-gray-800 text-base order-1 md:order-2">
					{new Date(note.createdAt).toLocaleString("en-US")}
				</span>
			</div>

			<span className="text-gray-700 text-base">{note.text}</span>
		</div>
	);
};

export default NoteItem;
