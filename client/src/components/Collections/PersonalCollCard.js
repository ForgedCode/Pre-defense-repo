import urls from "../../constants/urls";
import draftToHtml from "draftjs-to-html";
import { Link } from "react-router-dom";

const PersonalCollCard = ({ collection }) => {
	const htmlDesc = draftToHtml(JSON.parse(collection.description));
	return (
		<Link to={`/collection/${collection._id}`}>
			<div className='flex flex-col bg-lightModal dark:bg-darkModal p-4 w-[350px] h-[500px] gap-4 rounded-sm cursor-pointer overflow-hidden'>
				<div className='basis-3/5 rounded-sm overflow-hidden'>
					{collection.imgUrl ? (
						<img
							className='object-cover w-full h-full'
							src={collection.imgUrl}
							alt={collection.title}
						/>
					) : (
						<img
							className='object-cover w-full h-full'
							src='../imgPlaceholder.png'
							alt='imgPlaceholder'
						/>
					)}
				</div>
				<div className='basis-2/5'>
					<h3 className='text-xl font-bold mb-2'>{collection.title}</h3>
					<h4 className='text-md mb-2 font-semibold bg-darkLink w-min px-4 py-2 rounded-3xl'>
						{collection.topic}
					</h4>
					<div
						className='break-words text-justify line-clamp-3'
						dangerouslySetInnerHTML={{ __html: htmlDesc }}
					/>
				</div>
			</div>
		</Link>
	);
};

export default PersonalCollCard;
