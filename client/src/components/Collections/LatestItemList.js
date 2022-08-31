import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getLatestItems } from "../../app/features/items/itemSlice";
import LatestItemCard from "./LatestItemCard";

const LatestItemList = () => {
	const dispatch = useDispatch();
	const { latestItems } = useSelector((state) => state.item);
	useEffect(() => {
		dispatch(getLatestItems());
	}, [dispatch]);
	return (
		<div className='basis-4/6'>
			<h2 className='font-bold text-2xl mb-4'>
				<FormattedMessage id='item.latest' />:
			</h2>
			<div className='flex flex-col gap-4'>
				{latestItems?.map((item) => (
					<LatestItemCard key={item._id} item={item} />
				))}
			</div>
		</div>
	);
};

export default LatestItemList;
