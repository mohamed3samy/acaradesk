import clsx from "clsx";

const formClasses =
	"block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)]  text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 text-sm md:text-base";

const Label = ({ id, children }) => {
	return (
		<label
			htmlFor={id}
			className="mb-2 block text-sm md:text-base font-medium text-gray-900"
		>
			{children}
		</label>
	);
};

export const TextField = ({
	id,
	label,
	type,
	className,
	children,
	...props
}) => {
	return (
		<div>
			{label && <Label id={id}>{label}</Label>}
			<div className="relative">
				<input
					id={id}
					type={type}
					{...props}
					className={clsx(
						formClasses,
						className,
						"px-[calc(theme(spacing.3)-1px)]"
					)}
				/>
				{children}
			</div>
		</div>
	);
};

export const SelectField = ({ id, label, className, ...props }) => {
	return (
		<div>
			{label && <Label id={id}>{label}</Label>}
			<select
				id={id}
				{...props}
				className={clsx(formClasses, className)}
			/>
		</div>
	);
};

export const TextArea = ({ id, label, className, ...props }) => {
	return (
		<div>
			{label && <Label id={id}>{label}</Label>}
			<textarea id={id} {...props} className={formClasses} />
		</div>
	);
};
