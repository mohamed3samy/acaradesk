import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaLowVision } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { HiOutlineLockClosed, HiUser } from "react-icons/hi";

import { login, reset } from "../features/auth/authSlice";
import AuthLayout from "../components/layout/AuthLayout";
import Button from "../components/UI/Button";
import { TextField } from "../components/UI/Fields";
import Loader from "../components/UI/Loader";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess || user) navigate("/");

		dispatch(reset());
	}, [dispatch, isError, isSuccess, user, navigate, message]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const userDate = { email, password };
		dispatch(login(userDate));
	};

	if (isLoading) return <Loader />;

	return (
		<AuthLayout
			className="pt-24 pb-10"
			title="Sign in to account"
			subtitle={
				<>
					Don’t have an account?{" "}
					<Link to="/register" className="text-cyan-500">
						Sign up
					</Link>
				</>
			}
		>
			<form onSubmit={onSubmit}>
				<div className="space-y-6">
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
						className="pl-8 pr-4"
						label="Password"
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						value={password}
						autoComplete="current-password"
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
				</div>
				<Button type="submit" color="cyan" className="mt-8 w-full">
					Sign in
				</Button>
			</form>
		</AuthLayout>
	);
};

export default Login;
