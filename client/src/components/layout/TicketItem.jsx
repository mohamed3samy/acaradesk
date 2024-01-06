import Button from "../UI/Button";

const TicketItem = ({ ticket }) => {
	return (
		<tr className="odd:bg-gray-100">
			<td className="sm:pl-10 pl-2 pr-2 py-5 text-gray-800 text-xs sm:text-sm">
				{new Date(ticket.createdAt).toLocaleString("en-US")}
			</td>
			<td className="py-5 text-gray-800 text-xs sm:text-sm md:text-base text-center font-medium">
				{ticket.product}
			</td>
			<td className="pr-2 py-5 text-center">
				<span
					className={`${
						ticket.status === "new"
							? "bg-green-600"
							: "bg-red-700"
					} text-xs sm:text-sm text-white px-6 py-1 rounded-full`}
				>
					{ticket.status}
				</span>
			</td>
			<td className="py-5 text-green-400 pr-2 sm:pr-10 text-xs sm:text-sm text-right">
				<Button href={`/ticket/${ticket._id}`} variant="outline">
					View
				</Button>
			</td>
		</tr>
	);
};

export default TicketItem;
