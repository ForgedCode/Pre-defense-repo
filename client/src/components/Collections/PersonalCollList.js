import { useEffect } from "react";
import PersonalCollCard from "./PersonalCollCard";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getPersonalColl } from "../../app/features/collection/collectionSlice";
import Loader from "../Loader/Loader";

const PersonalCollList = () => {
	const dispatch = useDispatch();
	const { personalColl, isLoading } = useSelector((state) => state.collection);
	useEffect(() => {
		dispatch(getPersonalColl());
	}, [dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className='flex flex-wrap gap-4 justify-center items-center md:justify-start'>
			{personalColl ? (
				personalColl?.map((coll) => (
					<PersonalCollCard key={coll._id} collection={coll} />
				))
			) : (
				<div className='flex items-center justify-center'>
					<h3 className='text-lg'>
						<FormattedMessage id='collection.empty' />
					</h3>
				</div>
			)}
		</div>
	);
};

export default PersonalCollList;
