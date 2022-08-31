import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment } from "../../app/features/comments/commentSlice";

const CommentInput = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const [comment, setComment] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();
	};
	const onTextChange = (e) => {
		setComment(e.target.value);
	};
	const addCommentHandler = async () => {
		await dispatch(addComment({ comment, params }));
		setComment("");
	};
	return (
		<form onClick={submitHandler} className='mb-8'>
			<textarea
				value={comment}
				onChange={onTextChange}
				className='outline-none w-full p-4 resize-none mb-4 dark:text-dark shadow-sm'
				rows='7'
			/>
			<div className='flex justify-end'>
				<button
					onClick={addCommentHandler}
					className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					<FormattedMessage id='comment.add' />
				</button>
			</div>
		</form>
	);
};

export default CommentInput;
