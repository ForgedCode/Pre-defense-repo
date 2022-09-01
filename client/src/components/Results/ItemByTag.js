import React from "react";
import { FormattedMessage } from "react-intl";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ItemByTag = ({ item }) => {
	const { currentLocale } = useSelector((state) => state.locale);

	return (
		<Link to={`/collection/item/${item._id}`}>
			<div className='w-full bg-white dark:bg-darkModal  text-lg tracking-tight font-medium p-4 shadow-sm hover:shadow-lg dark:hover:bg-opacity-30 duration-200'>
				<h3>
					<FormattedMessage id='item.title' />: <span>{item.title}</span>
				</h3>
				<h3>
					<FormattedMessage id='collection.title' />:{" "}
					<span>{item.collName}</span>
				</h3>
				<h3>
					<FormattedMessage id='createdBy' />: <span>{item.creator}</span>
				</h3>
				<h3>
					<FormattedMessage id='createdAt' />:{" "}
					<Moment locale={currentLocale === "ru" ? "ru" : "en"} fromNow>
						{item.createdAt}
					</Moment>
				</h3>
			</div>
		</Link>
	);
};

export default ItemByTag;
