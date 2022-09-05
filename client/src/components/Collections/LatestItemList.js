import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { getLatestItems } from "../../app/features/items/itemSlice";
import LatestItemCard from "./LatestItemCard";

const LatestItemList = () => {
	const dispatch = useDispatch();
	const { latestItems, isLoading } = useSelector((state) => state.item);
	useEffect(() => {
		dispatch(getLatestItems());
	}, [dispatch]);
	return (
		<div className='w-full'>
			{!isLoading ? (
				<>
					<h2 className='font-bold text-2xl mb-4'>
						<FormattedMessage id='item.latest' />:
					</h2>
					<div className='flex flex-col gap-4'>
						{latestItems?.map((item) => (
							<LatestItemCard key={item._id} item={item} />
						))}
					</div>
				</>
			) : (
				<>
					<Skeleton className='dark:bg-darkModal' height={100} />
					<Skeleton className='dark:bg-darkModal' height={100} />
					<Skeleton className='dark:bg-darkModal' height={100} />
				</>
			)}
		</div>
	);
};

export default LatestItemList;
