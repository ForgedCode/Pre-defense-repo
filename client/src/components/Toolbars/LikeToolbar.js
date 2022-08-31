import { ThumbUp } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	clearMessages,
	getCollItem,
	likeItem,
} from "../../app/features/items/itemSlice";

const LikeToolbar = ({ likes }) => {
	const { isLogin } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const params = useParams();
	const likeHandler = async (e) => {
		e.preventDefault();
		await dispatch(likeItem({ params }));
		dispatch(getCollItem({ params }));
		dispatch(clearMessages());
	};
	return (
		<div className='flex my-4 items-center gap-8 font-semibold'>
			{isLogin && (
				<button
					onClick={likeHandler}
					className='flex items-center gap-4 rounded-sm bg-darkLink px-4 py-2 hover:bg-lightLink duration-200'
				>
					<p>
						<FormattedMessage id='like' />
					</p>
				</button>
			)}

			<div className='flex items-center gap-4 px-4 py-2 text-center bg-darkLink rounded-sm'>
				<ThumbUp />
				<span>{likes?.length}</span>
			</div>
		</div>
	);
};

export default LikeToolbar;
