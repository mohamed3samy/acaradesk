import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaLowVision } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { BiUserPin } from "react-icons/bi";
import { HiOutlineLockClosed, HiUser } from "react-icons/hi";

import { register, reset } from "../features/auth/authSlice";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/UI/Button";
import { TextField } from "../components/UI/Fields";
import Loader from "../components/UI/Loader";

const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirm_password: "",
	});

	const { name, email, password, confirm_password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess || user) navigate("/");

		dispatch(reset());
	}, [user, isSuccess, isError, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== confirm_password) {
			toast.error(`Passwords don't match!`);
		} else {
			const userData = { name, email, password };
			dispatch(register(userData));
		}
	};

	if (isLoading) return <Loader />;

	return (
		<AuthLayout
			className="pt-32 pb-16"
			title="Sign Up for an account"
			subtitle={
				<>
					Already registered?{" "}
					<Link to="/login" className="text-cyan-600">
						Sign in
					</Link>{" "}
					to your account{" "}
				</>
			}
		>
			<form onSubmit={onSubmit}>
				<div className="space-y-6">
					<TextField
						className="pl-8 pr-4"
						label="Your name"
						id="name"
						name="name"
						type="text"
						value={name}
						autoComplete="given-name"
						onChange={onChange}
					>
						<div className="cursor-pointer absolute p-3 top-0 left-0">
							<BiUserPin className="text-base md:text-lg text-gray-700" />
						</div>
					</TextField>
					<TextField
						className="pl-8 pr-4"
						label="Email address"
						id="email"
						name="email"
						type="email"
						value={email}
						autoComplete="email"
						onChange={onChange}
					>
						<div className="cursor-pointer absolute p-3 top-0 left-0">
							<HiUser className="text-base text-gray-700" />
						</div>
					</TextField>
					<TextField
						className="px-8"
						label="Password"
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						value={password}
						autoComplete="new-password"
						onChange={onChange}
					>
						<div className="cursor-pointer absolute p-3 top-0 left-0">
							<HiOutlineLockClosed className="text-base text-gray-700" />
						</div>
						<div
							className="cursor-pointer absolute p-3 top-0 right-1"
							onClick={() =>
								setShowPassword((prevState) => !prevState)
							}
						>
							{showPassword ? (
								<MdVisibility className="text-lg text-gray-900" />
							) : (
								<FaLowVision className="text-lg text-gray-900" />
							)}
						</div>
					</TextField>
					<TextField
						className="px-8"
						label="Confirm password"
						id="confirm_password"
						name="confirm_password"
						type={showConfirm ? "text" : "password"}
						value={confirm_password}
						autoComplete="new-password"
						onChange={onChange}
					>
						<div className="cursor-pointer absolute p-3 top-0 left-0">
							<HiOutlineLockClosed className="text-base text-gray-700" />
						</div>
						<div
							className="cursor-pointer absolute p-3 top-0 right-1"
							onClick={() =>
								setShowConfirm((prevState) => !prevState)
							}
						>
							{showConfirm ? (
								<MdVisibility className="text-lg text-gray-900" />
							) : (
								<FaLowVision className="text-lg text-gray-900" />
							)}
						</div>
					</TextField>
				</div>
				<Button type="submit" color="cyan" className="mt-8 w-full">
					Sign up
				</Button>
			</form>
		</AuthLayout>
	);
};

export default Register;
