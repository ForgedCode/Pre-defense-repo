import { Add, Delete, Edit } from "@mui/icons-material";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
	clearMessages,
	deleteCollItem,
	getCollItems,
} from "../../app/features/items/itemSlice";

const ItemToolbar = ({ selectedItem }) => {
	const params = useParams();
	const dispatch = useDispatch();

	const deleteItemHandler = async () => {
		await dispatch(deleteCollItem({ selectedItem, params }));
		dispatch(clearMessages());
		return dispatch(getCollItems({ params }));
	};

	return (
		<div className='flex flex-wrap gap-2 w-full m-auto py-4'>
			<Link
				to={`/collection/${params.id}/createItem`}
				className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='item.add' />
				</span>
				<Add />
			</Link>
			<Link
				to={`/collection/editItem/${selectedItem}`}
				className={`flex items-center gap-2 mr-4 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ${
					selectedItem
						? "pointer-events-auto"
						: "opacity-40 pointer-events-none"
				} `}
			>
				<span>
					<FormattedMessage id='item.edit' />
				</span>
				<Edit />
			</Link>
			<button
				onClick={deleteItemHandler}
				disabled={!selectedItem}
				className='flex items-center gap-2 bg-red-500 mr-4 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded disabled:hover:bg-red-500 disabled:opacity-40'
			>
				<span>
					<FormattedMessage id='item.delete' />
				</span>
				<Delete />
			</button>
		</div>
	);
};

export default ItemToolbar;
