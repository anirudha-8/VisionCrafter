import React from "react";

const FormField = ({
	labelName,
	type,
	name,
	placeholder,
	value,
	handleChange,
	isSurpriseMe,
	handleSupriseMe,
}) => {
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<label
					className="block text-sm font-medium text-gray-900"
					htmlFor={name}
				>
					{labelName}
				</label>
			</div>
		</div>
	);
};

export default FormField;
