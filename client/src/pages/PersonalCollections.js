import React from "react";
import PersonalCollList from "../components/Collections/PersonalCollList";
import AddCollection from "../components/Toolbars/AddCollection";

const PersonalCollections = () => {
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 py-8'>
			<AddCollection />
			<PersonalCollList />
		</div>
	);
};

export default PersonalCollections;
