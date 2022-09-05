import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQueryItems } from "../app/features/items/itemSlice";
import ItemResults from "../components/Results/ItemResults";
import localStorageKeys from "../constants/localStorageKeys";

const SearchResults = () => {
	const { queryItems } = useSelector((state) => state.item);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const queryItem = JSON.parse(
			localStorage.getItem(localStorageKeys.QUERY_RESULTS)
		);
		dispatch(getQueryItems({ queryItem, navigate }));
	}, [dispatch, navigate]);
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
