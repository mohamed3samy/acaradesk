import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Tickets from "./pages/Tickets";
import NewTicket from "./pages/NewTicket";
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<>
			<Router>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<Header />
					<AnimatePresence>
						<main>
							<Routes>
								<Route exact path="/" element={<Home />} />
								<Route path="/login" element={<Login />} />
								<Route
									path="/register"
									element={<Register />}
								/>
								<Route
									path="/tickets"
									element={<PrivateRoute />}
								>
									<Route
										path="/tickets"
										element={<Tickets />}
									/>
								</Route>
								<Route
									path="/new-ticket"
									element={<PrivateRoute />}
								>
									<Route
										path="/new-ticket"
										element={<NewTicket />}
									/>
								</Route>
								<Route
									path="/ticket/:ticketId"
									element={<PrivateRoute />}
								>
									<Route
										path="/ticket/:ticketId"
										element={<Ticket />}
									/>
								</Route>
								<Route
									path="/profile"
									element={<PrivateRoute />}
								>
									<Route
										path="/profile"
										element={<Profile />}
									/>
								</Route>
								<Route path="*" element={<NotFound />} />
							</Routes>
						</main>
					</AnimatePresence>
				</motion.div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
