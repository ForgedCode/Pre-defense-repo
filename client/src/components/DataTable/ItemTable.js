import { Box } from "@mui/material";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCollItems } from "../../app/features/items/itemSlice";
import ItemToolbar from "../Toolbars/ItemToolbar";

const ItemTable = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const intl = useIntl();
	const { user } = useSelector((state) => state.auth);
	const { specificColl } = useSelector((state) => state.collection);
	const { collectionItems, messages } = useSelector((state) => state.item);
	const { currentLocale } = useSelector((state) => state.locale);
	const [selectedItem, setSelectedItem] = useState("");
	useEffect(() => {
		dispatch(getCollItems({ params }));
	}, [dispatch, params]);

	useEffect(() => {
		if (messages && currentLocale === "ru") {
			toast(Object.values(messages)[0]);
		} else {
			toast(Object.values(messages)[1]);
		}
	}, [messages, currentLocale]);

	const rows = collectionItems?.map((data) => ({
		id: data._id,
		itemId: data.itemId,
		title: data.title,
		createdAt: new Date(data.createdAt),
		link: data._id,
	}));

	const columns = [
		{ field: "id", headerName: "ID", width: 250, hide: true },
		{
			field: "itemId",
			headerName: intl.formatMessage({ id: "item.id" }),
			width: 250,
		},
		{
			field: "title",
			headerName: intl.formatMessage({ id: "item.title" }),
			width: 250,
		},
		{
			field: "createdAt",
			headerName: intl.formatMessage({ id: "table.createdAt" }),
			type: "date",
			width: 220,
		},
		{
			field: "link",
			headerName: intl.formatMessage({ id: "item.more" }),
			width: 220,
			renderCell: (params) => (
				<Link
					className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					to={`/collection/item/${params.value}`}
				>
					<FormattedMessage id='item.page' />
				</Link>
			),
		},
	];

	return (
		<Box sx={{ height: 500, width: "100%" }}>
			{(user?._id === specificColl?.author || user?.isAdmin) && (
				<ItemToolbar selectedItem={selectedItem[0]} />
			)}
			{collectionItems.length >= 1 ? (
				<DataGrid
					className='text-dark dark:text-light'
					rows={rows}
					columns={columns}
					autoHeight
					onSelectionModelChange={setSelectedItem}
					pageSize={5}
					rowsPerPageOptions={[5]}
					localeText={
						currentLocale === "ru"
							? ruRU.components.MuiDataGrid.defaultProps.localeText
							: {}
					}
				/>
			) : (
				<div className='flex items-center justify-center py-8'>
					<h3 className='font-semibold text-xl'>
						<FormattedMessage id='item.empty' />
					</h3>
				</div>
			)}
		</Box>
	);
};

export default ItemTable;
