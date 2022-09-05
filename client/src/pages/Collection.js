import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCollById } from "../app/features/collection/collectionSlice";
import draftToHtml from "draftjs-to-html";
import { FormattedMessage } from "react-intl";
import Moment from "react-moment";
import "moment/locale/ru";
import CollectionToolbar from "../components/Toolbars/CollectionToolbar";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import ItemTable from "../components/DataTable/ItemTable";

const Collection = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { currentLocale } = useSelector((state) => state.locale);
	const { specificColl, isLoading, messages } = useSelector(
		(state) => state.collection
	);
	const fetchCollection = useCallback(() => {
		dispatch(getCollById(params));
	}, [dispatch, params]);
	useEffect(() => {
		fetchCollection();
	}, [fetchCollection]);
	const htmlDesc =
		specificColl.description &&
		draftToHtml(JSON.parse(specificColl.description));

	useEffect(() => {
		if (messages && currentLocale === "ru") {
			toast(Object.values(messages)[0]);
		} else {
			toast(Object.values(messages)[1]);
		}
	}, [messages, currentLocale, dispatch]);

	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 p-8'>
			{!isLoading ? (
				<>
					<CollectionToolbar user={user} coll={specificColl} />
					<div className='flex flex-col min-h-[400px] w-full lg:flex-row lg:gap-8'>
						<div className=' lg:basis-2/6 mb-8'>
							<div className='flex flex-col bg-white p-4 shadow-sm dark:bg-darkModal'>
								<h2 className='text-2xl font-bold text-center mb-4 lg:text-left'>
									{specificColl.title}
								</h2>
								<div className='flex items-center gap-4 mb-2'>
									<span>
										<FormattedMessage id='collection.topicName' />
									</span>
									<h3>{specificColl.topic}</h3>
								</div>
								<div className='flex items-center gap-4 mb-2'>
									<span>
										<FormattedMessage id='collection.createdBy' />
									</span>
									<h3>{specificColl.creator}</h3>
								</div>
								<div className='flex items-center gap-2 mb-2'>
									<span>
										<FormattedMessage id='collection.createdAt' />
									</span>
									<Moment
										locale={currentLocale === "ru" ? "ru" : "en"}
										date={specificColl.createAt}
										format='D MMM YYYY'
									/>
								</div>
							</div>
						</div>
						<div className='h-[300px] mb-8 lg:basis-2/6 lg:-order-1'>
							{specificColl.imgUrl ? (
								<img
									className='object-cover w-full h-full'
									src={specificColl.imgUrl}
									alt={specificColl.title}
								/>
							) : (
								<img
									className='object-cover w-full h-full'
									src='../imgPlaceholder.png'
									alt='imgPlaceholder'
								/>
							)}
						</div>
						<div className='lg:basis-2/6 '>
							<div className='bg-white p-4 shadow-sm dark:bg-darkModal'>
								<h3 className='text-2xl font-bold mb-4'>
									<FormattedMessage id='collection.description' />
								</h3>
								<div dangerouslySetInnerHTML={{ __html: htmlDesc }} />
							</div>
						</div>
					</div>
					<ItemTable />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default Collection;
