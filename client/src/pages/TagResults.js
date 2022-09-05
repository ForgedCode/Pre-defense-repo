import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItemsByTag } from "../app/features/tags/tagSlice";
import ItemResults from "../components/Results/ItemResults";
import localStorageKeys from "../constants/localStorageKeys";

const TagResults = () => {
	const { itemsByTag } = useSelector((state) => state.tag);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		const tag = JSON.parse(localStorage.getItem(localStorageKeys.TAG_RESULTS));
		dispatch(getItemsByTag({ tag, navigate }));
	}, [dispatch, navigate]);
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 p-8'>
			<div className='font-semibold text-lg mb-8'>
				<h3>
					<FormattedMessage id='tagResults' /> " {itemsByTag.tag} "
				</h3>
			</div>
			<div className='flex flex-col gap-4'>
				{itemsByTag.count === 0 && (
					<p className='flex justify-center'>
						<FormattedMessage id='tagResults.empty' />
					</p>
				)}
				{itemsByTag?.itemsByTag?.map((item) => (
					<ItemResults key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default TagResults;
