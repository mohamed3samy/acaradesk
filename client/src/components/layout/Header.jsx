import { Link, useNavigate } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineUserCircle } from "react-icons/hi";

import { logout, reset } from "../../features/auth/authSlice";
import Button from "../UI/Button";
import Container from "./Container";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const MenuIcon = (props) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M5 6h14M5 18h14M5 12h14"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const ChevronUpIcon = (props) => {
	return (
		<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
			<path
				d="M17 14l-5-5-5 5"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};

	return (
		<header className="absolute z-50 top-0 left-0 w-full">
			<nav>
				<Container className="relative z-50 flex justify-between items-center py-6 lg:py-8">
					<div className="relative z-20">
						<Link to="/">
							<Logo className="w-8 h-8 lg:w-9 lg:h-9" />
						</Link>
					</div>
					<div className="flex lg:items-center lg:gap-6">
						<Popover className="md:hidden">
							{({ open, close }) => (
								<>
									<Popover.Button
										className="relative z-20 inline-flex items-center rounded-lg stroke-gray-900 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 outline-none"
										aria-label="Toggle site navigation"
									>
										{({ open }) =>
											open ? (
												<ChevronUpIcon className="h-8 w-8" />
											) : (
												<MenuIcon className="h-8 w-8" />
											)
										}
									</Popover.Button>
									<AnimatePresence initial={false}>
										{open && (
											<>
												<Popover.Overlay
													static
													as={motion.div}
													initial={{
														opacity: 0,
													}}
													animate={{
														opacity: 1,
													}}
													exit={{ opacity: 0 }}
													className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
												/>
												<Popover.Panel
													static
													as={motion.div}
													initial={{
														opacity: 0,
														y: -32,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													exit={{
														opacity: 0,
														y: -32,
														transition: {
															duration: 0.2,
														},
													}}
													className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-32 shadow-2xl shadow-gray-900/20"
												>
													<div className="mt-8 flex flex-col gap-4">
														{user ? (
															<>
																<Button
																	href="/profile"
																	onClick={
																		close
																	}
																>
																	Profile
																</Button>
																<Button
																	onClick={() => {
																		onLogout();
																		close();
																	}}
																>
																	Logout
																</Button>
															</>
														) : (
															<>
																<Button
																	href="/login"
																	variant="outline"
																	onClick={
																		close
																	}
																>
																	Sign in
																</Button>
																<Button
																	href="/register"
																	onClick={
																		close
																	}
																>
																	Sign up
																</Button>
															</>
														)}
													</div>
												</Popover.Panel>
											</>
										)}
									</AnimatePresence>
								</>
							)}
						</Popover>

						{user ? (
							<div className="hidden md:flex items-center gap-x-4">
								<Link to="/profile">
									<HiOutlineUserCircle className="text-gray-400 text-3xl hidden md:block hover:text-gray-500 transition-colors duration-300" />
								</Link>
								<Button
									onClick={onLogout}
									className="hidden md:block"
								>
									Logout
								</Button>
							</div>
						) : (
							<div className="hidden md:flex items-center gap-x-4">
								<Button
									href="/login"
									variant="outline"
									className="hidden md:block"
								>
									Sign in
								</Button>
								<Button
									href="/register"
									className="hidden md:block"
								>
									Sign up
								</Button>
							</div>
						)}
					</div>
				</Container>
			</nav>
		</header>
	);
};

export default Header;
