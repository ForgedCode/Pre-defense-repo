import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItemsByTag, getSampleTags } from "../../app/features/tags/tagSlice";
import localStorageKeys from "../../constants/localStorageKeys";

const TagsCloud = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { tags, isLoading } = useSelector((state) => state.tag);
	const tagItemsHandler = (e) => {
		e.preventDefault();
		const tag = e.target.innerText;
		localStorage.setItem(localStorageKeys.TAG_RESULTS, JSON.stringify(tag));
		dispatch(getItemsByTag({ tag, navigate }));
	};
	useEffect(() => {
		dispatch(getSampleTags());
	}, [dispatch]);
	return (
		<div className='w-full bg-white p-2 shadow-sm dark:bg-darkModal'>
			{!isLoading ? (
				<>
					<h3 className='font-semibold text-xl mb-4'>
						<FormattedMessage id='tagClouds' />
					</h3>
					<div className='flex flex-wrap gap-4'>
						{tags?.map((tag) => (
							<button
								onClick={tagItemsHandler}
								className='bg-orange-400 px-4 py-1 rounded-full tracking-tight font-semibold duration-200 hover:bg-orange-200'
								key={tag._id}
							>
								{tag.tag}
							</button>
						))}
					</div>
				</>
			) : (
				<Skeleton className='dark:bg-darkModal' height={300} />
			)}
		</div>
	);
};

export default TagsCloud;
