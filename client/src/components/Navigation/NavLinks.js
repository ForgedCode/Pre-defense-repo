import React from "react";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import routes from "../../constants/routes";
import { useSelector } from "react-redux";

const NavLinks = () => {
	const { isLogin } = useSelector((state) => state.auth);

	return (
		<ul className='flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-6 text-base'>
			<li>
				<NavLink
					className={({ isActive }) =>
						isActive
							? "pb-1 border-b-2 border-dark dark:border-light hover:text-lightLink"
							: "hover:text-lightLink"
					}
					to={routes.HOME}
				>
					<FormattedMessage id='nav.home' />
				</NavLink>
			</li>
			{isLogin && (
				<li>
					<NavLink
						className={({ isActive }) =>
							isActive
								? "pb-1 border-b-2 border-dark dark:border-light hover:text-lightLink"
								: "hover:text-lightLink"
						}
						to={routes.MYCOLLS}
					>
						<FormattedMessage id='nav.mycolls' />
					</NavLink>
				</li>
			)}
		</ul>
	);
};

export default NavLinks;
