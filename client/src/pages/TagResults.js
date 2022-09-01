import React from "react";
import { useSelector } from "react-redux";
import ItemByTag from "../components/Results/ItemByTag";

const TagResults = () => {
	const { itemsByTag } = useSelector((state) => state.tag);
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 p-8'>
			<div className='flex flex-col gap-4'>
				{itemsByTag?.map((item) => (
					<ItemByTag key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default TagResults;
