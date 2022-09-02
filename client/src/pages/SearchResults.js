import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import ItemResults from "../components/Results/ItemResults";

const SearchResults = () => {
	const { queryItems } = useSelector((state) => state.item);
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 p-8'>
			<div className='font-semibold text-lg mb-8'>
				<h3>
					<FormattedMessage id='queryResults' /> "{queryItems.queryItem}"
				</h3>
				<h3>
					({queryItems.count}){" "}
					{queryItems.count === 1 ? (
						<FormattedMessage id='queryFoundSing' />
					) : (
						<FormattedMessage id='queryFoundPlur' />
					)}
				</h3>
			</div>
			<div className='flex flex-col gap-4'>
				{queryItems?.queryResults?.map((item) => (
					<ItemResults key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default SearchResults;
