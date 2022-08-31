import { Search } from "@mui/icons-material";

const SearchBar = () => {
	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<form onClick={submitHandler} className='flex items-center w-5/6 lg:w-full'>
			<div className='flex items-center justify-between w-3/4 md:w-full rounded-full overflow-hidden dark:bg-light border border-dark'>
				<input
					className='outline-none w-full pl-4 py-2 bg-light border-none dark:text-dark'
					type='text'
					name='search'
				/>
				<button
					type='submit'
					className='flex items-center justify-center w-2/6 md:w-1/6 py-2 rounded-full bg-lightLink hover:bg-blue-800 transition-all'
				>
					<Search className='text-light' />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
