import { AddCircle } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import routes from "../../constants/routes";

const AddCollection = () => {
	return (
		<div className='flex flex-wrap gap-2 w-full m-auto py-4'>
			<Link
				to={routes.CREATE_COLLECTION}
				className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='collection.add' />
				</span>
				<AddCircle />
			</Link>
		</div>
	);
};

export default AddCollection;
