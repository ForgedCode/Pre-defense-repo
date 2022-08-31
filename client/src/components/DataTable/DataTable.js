import { Box } from "@mui/material";
import { DataGrid, ruRU } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import TableToolbar from "../Toolbars/TableToolbar";
import { getUserData } from "../../app/features/userControl/userControlSlice";

const DataTable = () => {
	const { userData } = useSelector((state) => state.userControl);
	const [selectedData, setSelectedData] = useState([]);
	const { currentLocale } = useSelector((state) => state.locale);
	const intl = useIntl();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserData());
	}, [dispatch]);

	const rows = userData?.map((data) => ({
		id: data._id,
		username: data.username,
		email: data.email,
		createdAt: new Date(data.createdAt),
		isAdmin: data.isAdmin
			? intl.formatMessage({ id: "table.admin" })
			: intl.formatMessage({ id: "table.user" }),
		isBlocked: data.isBlocked
			? intl.formatMessage({ id: "table.blocked" })
			: intl.formatMessage({ id: "table.active" }),
	}));

	const columns = [
		{ field: "id", headerName: "ID", width: 250, hide: true },
		{
			field: "username",
			headerName: intl.formatMessage({ id: "table.username" }),
			width: 250,
		},
		{
			field: "email",
			headerName: intl.formatMessage({ id: "table.email" }),
			width: 250,
		},
		{
			field: "createdAt",
			headerName: intl.formatMessage({ id: "table.createdAt" }),
			type: "date",
			width: 220,
		},
		{
			field: "isAdmin",
			headerName: intl.formatMessage({ id: "table.role" }),
			width: 220,
		},
		{
			field: "isBlocked",
			headerName: intl.formatMessage({ id: "table.status" }),
			width: 250,
			cellClassName: (params) => {
				if (params.value === intl.formatMessage({ id: "table.blocked" })) {
					return "text-red-700";
				} else {
					return "text-green-700";
				}
			},
		},
	];

	return (
		<Box sx={{ height: 700, width: "100%" }}>
			<TableToolbar selectedUsers={selectedData} />
			<DataGrid
				className='text-dark dark:text-light'
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
				checkboxSelection
				onSelectionModelChange={setSelectedData}
				disableSelectionOnClick
				localeText={
					currentLocale === "ru"
						? ruRU.components.MuiDataGrid.defaultProps.localeText
						: {}
				}
			/>
		</Box>
	);
};

export default DataTable;
