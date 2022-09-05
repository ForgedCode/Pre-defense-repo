import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { MenuOpen, Close } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import routes from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/features/auth/authSlice";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [navOpen, setNavOpen] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const navToggleHandler = () => {
		setNavOpen(!navOpen);
	};
	const menuToggleHandler = () => {
		setMenuOpen(!menuOpen);
	};
	const { isLogin, user } = useSelector((state) => state.auth);
	const { isAdmin } = user ? user : false;
	const logoutHandler = () => {
		dispatch(logout());
		navigate(routes.HOME);
	};

	return (
		<header className='min-h-[80px] w-full fixed top-0 z-50 p-4 bg-light text-dark dark:text-light dark:bg-dark shadow-lg'>
			<div className='container m-auto lg:flex gap-[5%] lg:justify-between lg:items-center'>
				<div className='flex items-center justify-between lg:basis-3/6'>
					<SearchBar />
					<button
						onClick={navToggleHandler}
						className='flex lg:hidden items-center justify-center'
					>
						{navOpen ? (
							<Close className='scale-150' />
						) : (
							<MenuOpen className='scale-150' />
						)}
					</button>
				</div>
				<nav
					className={`${
						navOpen ? "flex" : "hidden"
					} lg:flex relative flex-col pt-6 lg:pt-0 lg:flex-row lg:justify-between lg:items-center lg:basis-3/6`}
				>
					<div
						className={`flex flex-col items-center gap-6 justify-evenly md:flex-row md:order-2 md:mr-6 md:mt-5 lg:mt-0 lg:mr-0 lg:absolute ${
							menuOpen ? "lg:flex-col" : "lg:hidden"
						} lg:px-8 lg:py-4 lg:border lg:shadow-sm top-[56px] right-0 bg-light dark:bg-dark 2xl:flex 2xl:static 2xl:flex-row 2xl:p-0 2xl:border-none 2xl:shadow-none`}
					>
						{isLogin ? (
							<>
								<button
									className='border border-lightLink flex items-center rounded-full py-2 px-4 dark:bg-lightLink hover:bg-lightLink transition-all dark:hover:bg-light dark:hover:text-dark hover:text-light'
									onClick={logoutHandler}
								>
									<FormattedMessage id='nav.logout' />
								</button>
								{isAdmin ? (
									<Link
										className='border border-lightLink flex items-center rounded-full py-2 px-4 dark:bg-lightLink hover:bg-lightLink transition-all dark:hover:bg-light dark:hover:text-dark hover:text-light'
										to={routes.ADMIN}
									>
										<FormattedMessage id='nav.admin' />
									</Link>
								) : (
									""
								)}
							</>
						) : (
							<>
								<Link
									className='border border-lightLink flex items-center rounded-full py-2 px-4 dark:bg-lightLink hover:bg-lightLink transition-all dark:hover:bg-light dark:hover:text-dark hover:text-light'
									to={routes.LOGIN}
								>
									<FormattedMessage id='nav.login' />
								</Link>
								<Link
									className='border border-transparent flex items-center text-light bg-green-500 rounded-full py-2 px-4 hover:bg-light hover:text-dark transition-all hover:border-green-500 dark:hover:text-dark'
									to={routes.REGISTER}
								>
									<FormattedMessage id='nav.register' />
								</Link>
							</>
						)}
						<ThemeSwitcher />
						<LocaleSwitcher />
					</div>
					<button
						onClick={menuToggleHandler}
						className='hidden lg:flex order-2 2xl:hidden items-center justify-center'
					>
						{menuOpen ? (
							<Close className='scale-150' />
						) : (
							<MenuOpen className='scale-150' />
						)}
					</button>
					<div className='mt-6 md:mt-0 font-semibold'>
						<NavLinks />
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
