import { useState } from "react";
import { useSelector } from "react-redux";

import AuthLayout from "../components/layout/AuthLayout";
import { TextField } from "../components/UI/Fields";

const Profile = () => {
	const { user } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
	});

	const { name, email } = formData;

	return (
		<AuthLayout>
			<div className="space-y-6">
				<TextField
					className="px-[calc(theme(spacing.3)-1px)]"
					id="name"
					name="name"
					type="text"
					value={name}
					autoComplete="name"
					disabled
				/>
				<TextField
					className="px-[calc(theme(spacing.3)-1px)]"
					id="email"
					name="email"
					type="email"
					value={email}
					autoComplete="email"
					disabled
				/>
			</div>
		</AuthLayout>
	);
};

export default Profile;
