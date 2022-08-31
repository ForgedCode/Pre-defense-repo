import React from "react";

const Layout = ({ children }) => {
	return (
		<main className='text-dark bg-light dark:text-light dark:bg-dark'>
			<div className='container mx-auto mt-[80px]'>{children}</div>
		</main>
	);
};

export default Layout;
