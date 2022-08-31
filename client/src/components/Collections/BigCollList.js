import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBiggestColls } from "../../app/features/collection/collectionSlice";

const BigCollList = () => {
	const dispatch = useDispatch();
	const { biggestColls } = useSelector((state) => state.collection);
	useEffect(() => {
		dispatch(getBiggestColls());
	}, [dispatch]);
	return (
		<div className='basis-2/6'>
			<h3 className='font-semibold text-xl mb-4'>
				<FormattedMessage id='collection.biggest' />
			</h3>
			<ul className='flex flex-col gap-2'>
				{biggestColls?.map((coll) => (
					<li key={coll._id}>
						<Link
							className='hover:text-lightLink'
							to={`/collection/${coll._id}`}
						>
							{coll.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BigCollList;
