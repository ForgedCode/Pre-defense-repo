import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import PersonalCollections from "./pages/PersonalCollections";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { IntlProvider } from "react-intl";
import Navbar from "./components/Navigation/Navbar";
import { useDispatch, useSelector } from "react-redux";
import routes from "./constants/routes";
import { ToastContainer } from "react-toastify";
import localStorageKeys from "./constants/localStorageKeys";
import { useEffect } from "react";
import { stayLoggedIn } from "./app/features/auth/authSlice";
import Admin from "./pages/Admin";
import Forbidden from "./pages/Forbidden";
import CreateCollection from "./pages/CreateCollection";
import Collection from "./pages/Collection";
import EditCollection from "./pages/EditCollection";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import Item from "./pages/Item";
import NotFound from "./pages/NotFound";
import TagResults from "./pages/TagResults";
import SearchResults from "./pages/SearchResults";

function App() {
	const { messages, currentLocale } = useSelector((state) => state.locale);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(() => {
		const currentUser = JSON.parse(localStorage.getItem(localStorageKeys.USER));
		const token = JSON.parse(localStorage.getItem(localStorageKeys.TOKEN));
		if (currentUser && token) {
			dispatch(stayLoggedIn({ currentUser, token }));
		}
	}, [dispatch]);

	return (
		<IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
			<Navbar />
			<Layout>
				<Routes>
					<Route path={routes.HOME} element={<Main />} />
					<Route path={routes.LOGIN} element={<Login />} />
					<Route path={routes.REGISTER} element={<Registration />} />
					<Route path={routes.COLLECTION} element={<Collection />} />

					{user ? (
						<Route path={routes.MYCOLLS} element={<PersonalCollections />} />
					) : (
						<Route path={routes.MYCOLLS} element={<Forbidden />} />
					)}
					<Route
						path={routes.CREATE_COLLECTION}
						element={<CreateCollection />}
					/>
					<Route path={routes.EDIT_COLLECTION} element={<EditCollection />} />
					<Route path={routes.ITEM} element={<Item />} />
					<Route path={routes.CREATE_ITEM} element={<CreateItem />} />
					<Route path={routes.EDIT_ITEM} element={<EditItem />} />
					<Route path={routes.TAG_RESULTS} element={<TagResults />} />
					<Route path={routes.SEARCH_RESULTS} element={<SearchResults />} />
					{user && user.isAdmin ? (
						<Route path={routes.ADMIN} element={<Admin />} />
					) : (
						<Route path={routes.ADMIN} element={<Forbidden />} />
					)}
					<Route path='*' element={<NotFound />} />
				</Routes>
				<ToastContainer position='bottom-right' theme='dark' />
			</Layout>
		</IntlProvider>
	);
}

export default App;
