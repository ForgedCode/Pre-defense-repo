import {
	LockOpen,
	Lock,
	Delete,
	ManageAccounts,
	Person,
} from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../app/features/auth/authSlice";
import {
	blockUsers,
	clearMessages,
	deleteUsers,
	getUserData,
	makeAdmin,
	makeUser,
	unblockUsers,
} from "../../app/features/userControl/userControlSlice";
import routes from "../../constants/routes";

const TableToolbar = ({ selectedUsers }) => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const intl = useIntl();

	const deleteUsersHandler = async () => {
		await dispatch(deleteUsers({ selectedUsers }));
		dispatch(clearMessages());
		if (selectedUsers.includes(user._id)) {
			setTimeout(() => {
				toast(intl.formatMessage({ id: "table.deleteSelf" }));
				dispatch(logout());
				navigate(routes.HOME);
			}, 1000);
		}
		return dispatch(getUserData());
	};
	const blockUsersHandler = async () => {
		await dispatch(blockUsers({ selectedUsers }));
		dispatch(clearMessages());
		if (selectedUsers.includes(user._id)) {
			setTimeout(() => {
				toast(intl.formatMessage({ id: "table.banSelf" }));
				dispatch(logout());
				navigate(routes.HOME);
			}, 1000);
		}
		return dispatch(getUserData());
	};
	const unblockUsersHandler = async () => {
		await dispatch(unblockUsers({ selectedUsers }));
		dispatch(clearMessages());

		return dispatch(getUserData());
	};
	const makeAdminHandler = async () => {
		await dispatch(makeAdmin({ selectedUsers }));
		dispatch(clearMessages());
		return dispatch(getUserData());
	};
	const makeUserHandler = async () => {
		await dispatch(makeUser({ selectedUsers }));
		dispatch(clearMessages());
		if (selectedUsers.includes(user._id)) {
			toast(intl.formatMessage({ id: "table.adminSelf" }));
			navigate(routes.HOME);
		}
		return dispatch(getUserData());
	};

	return (
		<div className='flex flex-wrap gap-2 w-full m-auto py-4'>
			<button
				onClick={deleteUsersHandler}
				className='flex items-center gap-2 bg-red-500 mr-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='table.delete' />
				</span>
				<Delete />
			</button>
			<button
				onClick={blockUsersHandler}
				className='flex items-center gap-2 bg-yellow-500 mr-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='table.block' />
				</span>
				<Lock />
			</button>
			<button
				onClick={unblockUsersHandler}
				className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='table.unblock' />
				</span>
				<LockOpen />
			</button>
			<button
				onClick={makeAdminHandler}
				className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='table.makeAdmin' />
				</span>
				<ManageAccounts />
			</button>
			<button
				onClick={makeUserHandler}
				className='flex items-center gap-2 bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				<span>
					<FormattedMessage id='table.makeUser' />
				</span>
				<Person />
			</button>
		</div>
	);
};

export default TableToolbar;
