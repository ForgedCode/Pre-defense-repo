import locales from "../../localization/locales";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { changeLocale } from "../../app/features/locale/localeSlice";

const LocaleSwitcher = () => {
	const dispatch = useDispatch();
	const { currentLocale } = useSelector((state) => state.locale);
	const localeChangeHandler = (e) => {
		dispatch(changeLocale(e.target.value));
	};
	return (
		<form className='flex items-center'>
			<label htmlFor='underline_select' className='sr-only'>
				<FormattedMessage id='nav.lang' />
			</label>
			<select
				id='underline_select'
				value={currentLocale}
				onChange={localeChangeHandler}
				className='outline-none px-2 text-dark bg-light dark:bg-dark dark:text-light'
			>
				<option value={locales.EN}>English</option>
				<option value={locales.RU}>Русский</option>
			</select>
		</form>
	);
};

export default LocaleSwitcher;
