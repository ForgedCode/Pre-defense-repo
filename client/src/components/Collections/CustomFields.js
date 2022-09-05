import React from "react";

const CustomFields = ({ item }) => {
	const { customString } = item;
	console.log(customString);
	return (
		<div>
			{customString?.map((field) => (
				<div key={field._id}>
					<h3>{field?.title}</h3>
					<p>{field?.body}</p>
				</div>
			))}
		</div>
	);
};

export default CustomFields;
