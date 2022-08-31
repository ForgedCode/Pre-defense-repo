import { CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<div className='flex justify-center items-center mt-16 md:mt-20 lg:mt-28'>
			<CircularProgress size='5rem' />
		</div>
	);
};

export default Loader;
