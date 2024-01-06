const router = require("express").Router();

const { protect } = require("../middleware/authMiddleware");

const {
	getTickets,
	createTicket,
	getTicket,
	deleteTicket,
	updatedTicket,
} = require("../controllers/ticketController");

// Re-route into note router
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
	.route("/:id")
	.get(protect, getTicket)
	.delete(protect, deleteTicket)
	.put(protect, updatedTicket);

module.exports = router;
