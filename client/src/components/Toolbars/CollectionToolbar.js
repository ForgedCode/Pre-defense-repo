import { Edit, Delete, ArrowBack, NoteAdd } from "@mui/icons-material";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	clearMessages,
	deleteCollection,
} from "../../app/features/collection/collectionSlice";
import AddFieldsToolbar from "./AddFieldsToolbar";

const CollectionToolbar = ({ user, coll }) => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [fieldOpen, setFieldOpen] = useState(false);

	const fieldToggler = () => {
		setFieldOpen(!fieldOpen);
	};
	const deleteHandler = async () => {
		await dispatch(deleteCollection({ params, navigate }));
		dispatch(clearMessages());
	};
	return (
		<div>
			<div className='flex flex-wrap gap-2 w-full m-auto py-4'>
				<button
					onClick={() => navigate(-1)}
					className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					<span>
						<FormattedMessage id='collection.back' />
					</span>
					<ArrowBack />
				</button>
				{(user?._id === coll?.author || user?.isAdmin) && (
					<>
						<button
							onClick={deleteHandler}
							className='flex items-center gap-2 bg-red-500 mr-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
						>
							<span>
								<FormattedMessage id='collection.delete' />
							</span>
							<Delete />
						</button>
						<Link
							to={`/collection/${params.id}/edit`}
							className='flex items-center gap-2 bg-yellow-500 mr-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
						>
							<span>
								<FormattedMessage id='collection.edit' />
							</span>
							<Edit />
						</Link>
						<button
							onClick={fieldToggler}
							className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
						>
							<span>
								<FormattedMessage id='collection.addFields' />
							</span>
							<NoteAdd />
						</button>
					</>
				)}
			</div>
			{fieldOpen && <AddFieldsToolbar />}
		</div>
	);
};

export default CollectionToolbar;
