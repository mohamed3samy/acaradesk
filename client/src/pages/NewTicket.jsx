import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { createTicket, reset } from '../features/tickets/ticketSlice';
import AuthLayout from '../components/layout/AuthLayout';
import Button from '../components/UI/Button';
import { TextField, SelectField, TextArea } from '../components/UI/Fields';
import Loader from '../components/UI/Loader';

const NewTicket = () => {
	const { user } = useSelector((state) => state.auth);
	const { isLoading, isSuccess, isError, message } = useSelector(
		(state) => state.tickets
	);

	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
	});
	const { name, email } = formData;

	const [product, setProduct] = useState('');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess) {
			dispatch(reset());
			navigate('/tickets');
		}

		dispatch(reset());
	}, [isSuccess, isError, message, navigate, dispatch]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createTicket({ product, description }));
	};

	if (isLoading) return <Loader />;

	return (
		<AuthLayout
			className="pt-32 pb-16"
			title="Create New Ticket"
			subtitle="Please fill out the form below"
		>
			<form onSubmit={onSubmit}>
				<div className="space-y-6 overflow-hidden">
					<TextField
						className="px-[calc(theme(spacing.3)-1px)]"
						label="Your name"
						id="name"
						name="name"
						type="text"
						value={name}
						autoComplete="given-name"
						disabled
					/>
					<TextField
						className="px-[calc(theme(spacing.3)-1px)]"
						label="Email address"
						id="email"
						name="email"
						type="email"
						value={email}
						autoComplete="email"
						disabled
					/>

					<SelectField
						label="Product"
						id="referral-source"
						name="referral_source"
						value={product}
						onChange={(e) => setProduct(e.target.value)}
					>
						<option disabled value="">
							Choose a Product
						</option>
						<option value="iPhone">iPhone</option>
						<option value="Macbook Pro">Macbook Pro</option>
						<option value="iMac">iMac</option>
						<option value="iPad">iPad</option>
					</SelectField>

					<TextArea
						className="px-[calc(theme(spacing.3)-1px)]"
						label="Description of the issue"
						name="description"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<Button type="submit" color="cyan" className="mt-8 w-full">
					Submit
				</Button>
			</form>
		</AuthLayout>
	);
};

export default NewTicket;
