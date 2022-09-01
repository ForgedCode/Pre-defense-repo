import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollItem } from "../app/features/items/itemSlice";
import { getItemsByTag } from "../app/features/tags/tagSlice";
import CommentSection from "../components/Comments/CommentSection";
import Loader from "../components/Loader/Loader";
import LikeToolbar from "../components/Toolbars/LikeToolbar";

const Item = () => {
	const { specificItem, isLoading, messages } = useSelector(
		(state) => state.item
	);
	const { currentLocale } = useSelector((state) => state.locale);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getCollItem({ params }));
	}, [dispatch, params]);
	useEffect(() => {
		if (messages && currentLocale === "ru") {
			toast(Object.values(messages)[0]);
		} else {
			toast(Object.values(messages)[1]);
		}
	}, [messages, currentLocale, dispatch]);

	const tagItemsHandler = (e) => {
		e.preventDefault();
		const tag = e.target.innerText;
		dispatch(getItemsByTag({ tag, navigate }));
	};

	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 pt-8'>
			{!isLoading ? (
				<div>
					<button
						onClick={() => navigate(-1)}
						className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						<FormattedMessage id='collection.back' />
					</button>
					<div className='flex flex-col gap-12 md:flex-row md:gap-0 mt-8'>
						<div className='flex flex-col gap-4 basis-3/6'>
							<h3 className='font-semibold text-xl'>
								<FormattedMessage id='createdBy' />: {specificItem.creator}
							</h3>
							<h3 className='font-semibold text-xl'>
								<FormattedMessage id='item.title' />: {specificItem.title}
							</h3>
							<h3 className='font-semibold text-xl'>
								<FormattedMessage id='item.id' />: {specificItem.itemId}
							</h3>
							<div className='flex flex-wrap items-center gap-4'>
								<h3 className='font-semibold text-xl'>
									<FormattedMessage id='item.tags' />:
								</h3>
								<div className='flex gap-4 flex-wrap'>
									{specificItem.tags?.map((tag, index) => (
										<button
											onClick={tagItemsHandler}
											className='bg-orange-400 px-4 py-2 rounded-md tracking-tight font-semibold'
											key={index}
										>
											{tag}
										</button>
									))}
								</div>
							</div>
						</div>
						<div className='flex flex-col gap-4 basis-3/6'>
							<h3 className='font-semibold text-xl'>
								<FormattedMessage id='item.collection' />:{" "}
								{specificItem.collName}
							</h3>
							<h3 className='font-semibold text-xl'>
								<FormattedMessage id='createdAt' />:{" "}
								<Moment
									locale={currentLocale === "ru" ? "ru" : "en"}
									date={specificItem.createdAt}
									format='D MMM YYYY'
								/>
							</h3>
						</div>
					</div>
					<LikeToolbar likes={specificItem.likes} />
					<CommentSection />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default Item;
