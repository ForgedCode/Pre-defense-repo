import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import routes from "../constants/routes";

const Forbidden = () => {
	return (
		<div className='z-[9999] absolute top-0 left-0 flex flex-col items-center justify-center bg-light dark:bg-dark min-w-[100vw] min-h-[100vh]'>
			<h1 className='font-bold text-4xl tracking-tighter mb-8'>
				<FormattedMessage id='app.forbidden' />
			</h1>
			<Link
				className='font-semibold text-xl px-4 py-2 bg-darkLink hover:bg-lightLink rounded-full'
				to={routes.HOME}
			>
				<FormattedMessage id='nav.goMain' />
			</Link>
		</div>
	);
};

export default Forbidden;
