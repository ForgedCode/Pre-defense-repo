import { FormattedMessage } from "react-intl";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const CommentsList = ({ comment }) => {
	const { currentLocale } = useSelector((state) => state.locale);
	return (
		<div className='flex flex-col bg-white mb-4 p-4 rounded-md shadow-sm dark:bg-darkModal dark:text-light'>
			<div className='flex items-center gap-4 font-semibold tracking-tight mb-4'>
				<h4>
					<FormattedMessage id='username' />: {comment.commentBy}
				</h4>
				<span>&#8226;</span>
				<span>
					<Moment locale={currentLocale === "ru" ? "ru" : "en"} fromNow>
						{comment.createdAt}
					</Moment>
				</span>
			</div>
			<p>{comment.comment}</p>
		</div>
	);
};

export default CommentsList;
