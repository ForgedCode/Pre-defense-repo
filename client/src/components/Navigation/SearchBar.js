import { Search } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQueryItems } from "../../app/features/items/itemSlice";
import localStorageKeys from "../../constants/localStorageKeys";

const SearchBar = () => {
	const dispatch = useDispatch();
	const [query, setQuery] = useState("");
	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
	};
	const searchHandler = async () => {
		await dispatch(getQueryItems({ queryItem: query, navigate }));
		localStorage.setItem(localStorageKeys.QUERY_RESULTS, JSON.stringify(query));
		setQuery("");
	};
	return (
		<form onClick={submitHandler} className='flex items-center w-5/6 lg:w-full'>
			<div className='flex items-center justify-between w-3/4 md:w-full rounded-full overflow-hidden dark:bg-light border border-dark'>
				<input
					className='outline-none w-full pl-4 py-2 bg-light border-none dark:text-dark'
					type='text'
					name='search'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button
					type='submit'
					onClick={searchHandler}
					className='flex items-center justify-center w-2/6 md:w-1/6 py-2 rounded-full bg-lightLink hover:bg-blue-800 transition-all'
				>
					<Search className='text-light' />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
