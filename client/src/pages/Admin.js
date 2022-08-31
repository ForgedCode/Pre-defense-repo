import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DataTable from "../components/DataTable/DataTable";

const Admin = () => {
	const { user } = useSelector((state) => state.auth);
	const { currentLocale } = useSelector((state) => state.locale);
	const { messages } = useSelector((state) => state.userControl);

	useEffect(() => {
		if (messages && currentLocale === "ru") {
			toast(Object.values(messages)[0]);
		} else {
			toast(Object.values(messages)[1]);
		}
	}, [messages, currentLocale]);
	return (
		<div className='h-[calc(100vh-80px)] container m-auto px-4 lg:px-0 pt-8'>
			<div>
				<h2 className='text-2xl font-bold'>
					<FormattedMessage id='table.welcome' />, {user?.username}
				</h2>
			</div>
			<DataTable />
		</div>
	);
};

export default Admin;
