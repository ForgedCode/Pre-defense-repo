import BigCollList from "../components/Collections/BigCollList";
import LatestItemList from "../components/Collections/LatestItemList";
import TagsCloud from "../components/Tag/TagsCloud";

const Main = () => {
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 pt-8'>
			<div className='flex flex-col lg:flex-row gap-4'>
				<LatestItemList className='basis-4/6' />
				<div className='-order-2 lg:order-2 flex flex-col gap-8 basis-2/6'>
					<BigCollList />
					<TagsCloud />
				</div>
			</div>
		</div>
	);
};

export default Main;
