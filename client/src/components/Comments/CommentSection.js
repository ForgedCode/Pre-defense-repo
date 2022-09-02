import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getItemComments } from "../../app/features/comments/commentSlice";
import CommentInput from "./CommentInput";
import CommentsList from "./CommentsList";

const CommentSection = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { isLogin } = useSelector((state) => state.auth);
	const { comments } = useSelector((state) => state.comment);
	useEffect(() => {
		const fetch = setInterval(() => {
			dispatch(getItemComments({ params }));
		}, 2000);
		dispatch(getItemComments({ params }));
		return () => clearInterval(fetch);
	}, [dispatch, params]);

	return (
		<div className='flex flex-col mt-8'>
			{isLogin ? (
				<CommentInput />
			) : (
				<div className='flex justify-center items-center my-12 text-xl font-semibold'>
					<FormattedMessage id='auth.required' />
				</div>
			)}

			<div className='mb-4'>
				<h3 className='font-semibold text-2xl'>
					<FormattedMessage id='comments' /> <span>({comments?.length}) :</span>
				</h3>
			</div>
			{comments?.map((comment) => (
				<CommentsList key={comment._id} comment={comment} />
			))}
		</div>
	);
};

export default CommentSection;
