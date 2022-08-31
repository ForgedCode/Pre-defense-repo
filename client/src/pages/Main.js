import BigCollList from "../components/Collections/BigCollList";
import LatestItemList from "../components/Collections/LatestItemList";

const Main = () => {
	return (
		<div className='min-h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 pt-8'>
			<div className='flex flex-col lg:flex-row gap-4'>
				<LatestItemList />
				<BigCollList />
			</div>
		</div>
	);
};

export default Main;
