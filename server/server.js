const express = require("express");
const cors = require("cors");
const compression = require("compression");
const colors = require("colors");
const dotenv = require("dotenv").config();

const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Enable All CORS Requests
app.use(cors());
app.options("*", cors());

// compress all responses
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) =>
	res.status(200).json({ message: "Welcome to help desk" })
);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}!`));
