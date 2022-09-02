import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import ItemResults from "../components/Results/ItemResults";

const TagResults = () => {
	const { itemsByTag } = useSelector((state) => state.tag);
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 p-8'>
			<div className='font-semibold text-lg mb-8'>
				<h3>
					<FormattedMessage id='tagResults' /> " {itemsByTag.tag} "
				</h3>
			</div>
			<div className='flex flex-col gap-4'>
				{itemsByTag?.itemsByTag?.map((item) => (
					<ItemResults key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default TagResults;
