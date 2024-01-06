import axios from "axios";

const API_URL = "https://acara-api.onrender.com/api/tickets/";

// Get ticket notes
const getNotes = async (ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(
		API_URL + ticketId + "/notes",
		config
	);

	return data;
};

// Create note
const createNote = async (noteText, ticketId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(
		API_URL + ticketId + "/notes",
		{ text: noteText },
		config
	);

	return data;
};

const ticketService = { getNotes, createNote };

export default ticketService;
